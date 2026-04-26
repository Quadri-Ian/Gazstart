$root='c:\Users\ianqu\Gazstart'
$enc=[System.Text.Encoding]::UTF8

# 1) Trim extra sections from Our Story
$f = Join-Path $root 'public\legacy\naftagaz.com\en\company\our-story\index.html'
$lines=[System.IO.File]::ReadAllLines($f,$enc)
$start=-1; $end=-1
for($i=0;$i -lt $lines.Length;$i++){ if($lines[$i] -like '*section numbers*'){ $start=$i; break } }
for($i=0;$i -lt $lines.Length;$i++){ if($lines[$i] -like '*</section>*</main>*'){ $end=$i; break } }
if($start -ge 0 -and $end -gt $start){
  $list = New-Object 'System.Collections.Generic.List[string]'
  for($i=0;$i -lt $start;$i++){ [void]$list.Add($lines[$i]) }
  [void]$list.Add('                </main>')
  for($i=$end+1;$i -lt $lines.Length;$i++){ [void]$list.Add($lines[$i]) }
  [System.IO.File]::WriteAllLines($f,$list,$enc)
}

# 2) About hero headline/subheadline exact fixes
$files=@(
  'public\legacy\naftagaz.com\en\company\our-story\index.html',
  'public\legacy\naftagaz.com\en\company\our-people\index.html',
  'public\legacy\naftagaz.com\en\company\our-governance\index.html'
)
foreach($rel in $files){
  $p=Join-Path $root $rel
  $txt=Get-Content -Raw -Encoding UTF8 $p
  if($rel -like '*our-story*'){
    $txt=$txt.Replace('<span class="intro__content__title-text">The Blueflare Journey</span>','<span class="intro__content__title-text">The Blueflare Journey:</span>')
  }
  if($rel -like '*our-people*'){
    $txt=$txt.Replace('<span class="intro__content__title-text">Our People</span>','<span class="intro__content__title-text">People</span>')
  }
  if($rel -like '*our-governance*'){
    $txt=$txt.Replace('<span class="intro__content__title-text">Uncompromising Standards, Ethical Leadership</span>','<span class="intro__content__title-text">Our Governance</span>')
    $txt=$txt.Replace('<span class="intro__content__title-sub">Corporate Oversight</span>','<span class="intro__content__title-sub">Uncompromising Standards, Ethical Leadership</span>')
  }
  [System.IO.File]::WriteAllText($p,$txt,$enc)
}

# 3) Home page nav repair + copy refinements
$homeFile = Join-Path $root 'public\legacy\naftagaz.com\en\index.html'
$h = Get-Content -Raw -Encoding UTF8 $homeFile
$cleanNav = @'
<ul class="nav-primary group group--spacing">
    <li><a href="index.html" class="nav-primary__main-link" target="_self"><span>Home</span><div class="nav-primary__main-link__line"></div></a></li>
    <li>
        <div id="menu-dropdown-1" class="nav-primary__main-link" >
            <span>About Us</span>
            <div class="nav-primary__main-link__line"></div>
            <svg class="icon icon-arrow-down-small" width="10" height="5" aria-hidden="true" viewBox="0 0 10 5" style="--icon-width: 10; --icon-height: 5;"><use href="/local/templates/naftagaz/assets/images/icons.svg#arrow-down-small" xlink:href="/local/templates/naftagaz/assets/images/icons.svg#arrow-down-small"></use></svg>
            <div class="popover popover--triangle ui-light is-hidden" data-plugin="popover" data-popover-reference="#menu-dropdown-1" data-popover-event-reference="#menu-dropdown-1" data-popover-trigger="hover" data-popover-position="bottom-start">
                <div class="popover__content header-choice ui-light-background" style="flex-wrap: wrap;">
                    <a href="company/our-story/index.html" class="header-choice__link btn-container js-popover-link" target="_self"><div class="header-choice__content"><p>Our story</p><span class="btn btn--primary btn--square btn--sm"><span class="btn__content"><svg class="icon icon-arrow-right-small btn__icon" width="5" height="8" aria-hidden="true" viewBox="0 0 5 8" style="--icon-width: 5; --icon-height: 8;"><use href="/local/templates/naftagaz/assets/images/icons.svg#arrow-right-small" xlink:href="/local/templates/naftagaz/assets/images/icons.svg#arrow-right-small"></use></svg></span></span></div></a>
                    <a href="company/our-people/index.html" class="header-choice__link btn-container js-popover-link" target="_self"><div class="header-choice__content"><p>Our people</p><span class="btn btn--primary btn--square btn--sm"><span class="btn__content"><svg class="icon icon-arrow-right-small btn__icon" width="5" height="8" aria-hidden="true" viewBox="0 0 5 8" style="--icon-width: 5; --icon-height: 8;"><use href="/local/templates/naftagaz/assets/images/icons.svg#arrow-right-small" xlink:href="/local/templates/naftagaz/assets/images/icons.svg#arrow-right-small"></use></svg></span></span></div></a>
                    <a href="company/our-business/index.html" class="header-choice__link btn-container js-popover-link" target="_self"><div class="header-choice__content"><p>Our business</p><span class="btn btn--primary btn--square btn--sm"><span class="btn__content"><svg class="icon icon-arrow-right-small btn__icon" width="5" height="8" aria-hidden="true" viewBox="0 0 5 8" style="--icon-width: 5; --icon-height: 8;"><use href="/local/templates/naftagaz/assets/images/icons.svg#arrow-right-small" xlink:href="/local/templates/naftagaz/assets/images/icons.svg#arrow-right-small"></use></svg></span></span></div></a>
                    <a href="company/our-governance/index.html" class="header-choice__link btn-container js-popover-link" target="_self"><div class="header-choice__content"><p>Our governance</p><span class="btn btn--primary btn--square btn--sm"><span class="btn__content"><svg class="icon icon-arrow-right-small btn__icon" width="5" height="8" aria-hidden="true" viewBox="0 0 5 8" style="--icon-width: 5; --icon-height: 8;"><use href="/local/templates/naftagaz/assets/images/icons.svg#arrow-right-small" xlink:href="/local/templates/naftagaz/assets/images/icons.svg#arrow-right-small"></use></svg></span></span></div></a>
                </div>
            </div>
        </div>
    </li>
    <li><a href="company/sustainable_development/index.html" class="nav-primary__main-link" target="_self"><span>Sustainability</span><div class="nav-primary__main-link__line"></div></a></li>
    <li><a href="services/service/index.html" class="nav-primary__main-link" target="_self"><span>Services</span><div class="nav-primary__main-link__line"></div></a></li>
    <li><a href="career/hall-of-fame/index.html" class="nav-primary__main-link" target="_self"><span>Careers</span><div class="nav-primary__main-link__line"></div></a></li>
    <li><a href="contacts/index.html" class="nav-primary__main-link" target="_self"><span>Contact Us</span><div class="nav-primary__main-link__line"></div></a></li>
</ul>
'@
$h = [regex]::Replace($h,'<ul class="nav-primary group group--spacing">[\s\S]*?</ul>',$cleanNav,1)
$h = $h.Replace('<a href="services/driling/index.html" class="rising-banner btn-container ui-light">','<a href="contacts/index.html" class="rising-banner btn-container ui-light">')
$h = $h.Replace('<p class="rising-banner__title">Drilling</p>','<p class="rising-banner__title">Partner With Us</p>')
$h = $h.Replace('<h2>Management message</h2>','<h2>A Message from Management</h2>')
$h = [regex]::Replace($h,'data-tabs-content-id="company-1201" aria-hidden="true" role="tabpanel" data-tabs-element-animation-in="fade-in" data-tabs-element-animation-out="invisible">[\s\S]*?</p>','data-tabs-content-id="company-1201" aria-hidden="true" role="tabpanel" data-tabs-element-animation-in="fade-in" data-tabs-element-animation-out="invisible">Technical Support: On-site maintenance, installation, and engineering services backed by a highly skilled local workforce.</p>')
$h = [regex]::Replace($h,'data-tabs-content-id="company-1203" aria-hidden="true" role="tabpanel" data-reveal="title">[\s\S]*?</p>','data-tabs-content-id="company-1203" aria-hidden="true" role="tabpanel" data-reveal="title">Mission, Vision<br>Core Values</p>')
$h = [regex]::Replace($h,'data-tabs-content-id="company-1203" aria-hidden="true" role="tabpanel" data-tabs-element-animation-in="fade-in" data-tabs-element-animation-out="invisible">[\s\S]*?</p>','data-tabs-content-id="company-1203" aria-hidden="true" role="tabpanel" data-tabs-element-animation-in="fade-in" data-tabs-element-animation-out="invisible">Mission Statement: To provide world class technical and seamless procurement services to the Nigerian energy sector through innovative engineering, local talent development, and a steadfast commitment to operational safety and environmental responsibility.<br><br>Vision Statement: To be Africa''s most trusted integrated energy partner, recognised for bridge building between global standards and local operational needs.<br><br>Core Values: Precision. Reliability. Accountability. Local Content Excellence. Innovation. Customer eccentric.</p>')
[System.IO.File]::WriteAllText($homeFile,$h,$enc)

# 4) Sustainability page pillar updates
$sus = Join-Path $root 'public\legacy\naftagaz.com\en\company\sustainable_development\index.html'
$s = Get-Content -Raw -Encoding UTF8 $sus
$s = $s.Replace('<h2 class="safety__text-title leading-trim" data-reveal="title"><span class="is-hidden--sm-down">Occupational<br>Safety</span><span class="is-hidden--md-up">Occupational<br>Safety</span></h2>','<h2 class="safety__text-title leading-trim" data-reveal="title"><span class="is-hidden--sm-down">Pillar I:<br>Environmental Stewardship</span><span class="is-hidden--md-up">Pillar I:<br>Environmental Stewardship</span></h2>')
$s = $s.Replace('<h2 class="safety__text-title leading-trim" data-reveal="title">Environmental<br>Protection</h2>','<h2 class="safety__text-title leading-trim" data-reveal="title">Pillar II:<br>Local Capacity Building</h2>')
$s = $s.Replace('<h2 class="safety__text-title leading-trim" data-reveal="title">Social Security<br>of Employees</h2>','<h2 class="safety__text-title leading-trim" data-reveal="title">Pillar III:<br>Ethical Supply Chain & Governance</h2>')
$s = $s.Replace('<h2 class="safety__text-title leading-trim" data-reveal="title">High Level<br>of Competence</h2>','<h2 class="safety__text-title leading-trim" data-reveal="title">The Blueflare<br>Legacy</h2>')
$s = [regex]::Replace($s,'data-tabs-content-id="1201" aria-hidden="true" role="tabpanel">\s*<h2 class="safety__text-title leading-trim" data-reveal="title">Pillar II:<br>Local Capacity Building</h2>\s*<p class="safety__text-paragraph leading-trim" data-reveal="text">[\s\S]*?</p>','data-tabs-content-id="1201" aria-hidden="true" role="tabpanel">`r`n                                <h2 class="safety__text-title leading-trim" data-reveal="title">Pillar II:<br>Local Capacity Building</h2>`r`n                                <p class="safety__text-paragraph leading-trim" data-reveal="text">Goal: Investing in Nigeria''s Greatest Natural Resource-its People. At Blueflare Energy, true sustainability is impossible without local empowerment. The Blueflare Academy Initiative provides continuous technical training for Nigerian engineers. Our procurement strategy prioritizes indigenous vendors and subcontractors to stimulate regional growth. We also support educational and health initiatives in host communities, ensuring our presence leaves a lasting positive legacy.</p>')
$s = [regex]::Replace($s,'data-tabs-content-id="1202" aria-hidden="true" role="tabpanel">\s*<h2 class="safety__text-title leading-trim" data-reveal="title">Pillar III:<br>Ethical Supply Chain & Governance</h2>\s*<p class="safety__text-paragraph leading-trim" data-reveal="text">[\s\S]*?</p>','data-tabs-content-id="1202" aria-hidden="true" role="tabpanel">`r`n                                <h2 class="safety__text-title leading-trim" data-reveal="title">Pillar III:<br>Ethical Supply Chain & Governance</h2>`r`n                                <p class="safety__text-paragraph leading-trim" data-reveal="text">Goal: Building Trust Through Transparency. Every contract and sourced component is governed by integrity. We vet OEM partners for sustainability and human-rights compliance. Blueflare enforces a zero-tolerance policy for corruption in line with international anti-bribery standards. Our Goal Zero HSE culture protects people, communities, and long-term project performance.</p>')
$s = [regex]::Replace($s,'data-tabs-content-id="1203" aria-hidden="true" role="tabpanel">\s*<h2 class="safety__text-title leading-trim" data-reveal="title">The Blueflare<br>Legacy</h2>\s*<p class="safety__text-paragraph leading-trim" data-reveal="text">[\s\S]*?</p>','data-tabs-content-id="1203" aria-hidden="true" role="tabpanel">`r`n                                <h2 class="safety__text-title leading-trim" data-reveal="title">The Blueflare<br>Legacy</h2>`r`n                                <p class="safety__text-paragraph leading-trim" data-reveal="text">Sustainability at Blueflare Energy is a journey of continuous improvement. As the energy transition evolves, we are committed to proving that oil and gas operations can be safer, cleaner, and more beneficial to the Nigerian people through responsible engineering and ethical operations.</p>')
[System.IO.File]::WriteAllText($sus,$s,$enc)

Write-Host 'apply_copy_updates.ps1 completed.'