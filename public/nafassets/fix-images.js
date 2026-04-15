/**
 * Rewrites all /upload/ image paths to direct https://naftagaz.com URLs.
 * Must run BEFORE shared.js so the lazy-loader reads corrected data-src values.
 */
(function () {
    var BASE = 'https://naftagaz.com';

    function toNaftagaz(url) {
        if (!url || url.indexOf('naftagaz.com') !== -1) return url;
        // Absolute path starting with /upload/
        if (/^\/upload\//.test(url)) return BASE + url;
        // Relative path: ../../upload/ or ../upload/
        if (url.indexOf('upload/') !== -1) return url.replace(/(?:\.\.\/)*upload\//, BASE + '/upload/');
        return url;
    }

    function fixSrcset(val) {
        if (!val || val.indexOf('upload/') === -1) return val;
        return val.split(',').map(function (part) {
            var trimmed = part.trim();
            var spaceIdx = trimmed.search(/\s/);
            if (spaceIdx === -1) return toNaftagaz(trimmed);
            return toNaftagaz(trimmed.slice(0, spaceIdx)) + trimmed.slice(spaceIdx);
        }).join(', ');
    }

    document.querySelectorAll('source').forEach(function (s) {
        var v = s.getAttribute('srcset');
        if (v) s.setAttribute('srcset', fixSrcset(v));
        v = s.getAttribute('data-srcset');
        if (v) s.setAttribute('data-srcset', fixSrcset(v));
    });

    document.querySelectorAll('img').forEach(function (img) {
        var v = img.getAttribute('src');
        if (v && v.indexOf('upload/') !== -1) img.setAttribute('src', toNaftagaz(v));
        v = img.getAttribute('data-src');
        if (v && v.indexOf('upload/') !== -1) img.setAttribute('data-src', toNaftagaz(v));
        // Remove lazy-load visibility guards so images can be seen
        img.classList.remove('is-invisible--js', 'is-hidden--no-js');
    });

    document.querySelectorAll('picture').forEach(function (pic) {
        pic.classList.remove('is-invisible--js', 'is-hidden--no-js');
    });
})();
