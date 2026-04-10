export default function StatsSection() {
  return (
    <section className="ui-dark-background py-20 md:py-28">
      <div className="container-h">
        {/* Title */}
        <div className="title-border">
          <h2>Drilled (m)</h2>
        </div>

        {/* Giant drilling number */}
        <p className="numbers__drilling">
          6 800 000{" "}
          <span className="numbers__drilling__unit">+</span>
        </p>

        {/* Two stat columns */}
        <div className="grid grid-cols-2 md:grid-cols-4">
          <div>
            <p className="numbers__title">Annual drilling volume (m)</p>
            <p className="numbers__value">1 000 000</p>
          </div>
          <div className="md:col-start-3">
            <p className="numbers__title">Total investments (₽)</p>
            <p className="numbers__value">13 billion</p>
          </div>
        </div>
      </div>
    </section>
  );
}
