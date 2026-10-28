---
title: Sobre mí
permalink: /about/
kicker: Misión y método
subtitle: Por qué hago lo que hago, cómo lo hago, y para quién.
i18n_prefix: about
---

<section class="mision">
  <p class="mision__lead" data-i18n-en-html="My purpose as a brand is to <strong>guide and support businesses in their digital maturity process</strong>, transforming their technology in a step-by-step way — from market presence to full operational automation — to unlock their team's potential, multiply their revenue, and achieve an efficient and scalable operation.">
    Mi propósito como marca es <strong>guiar y acompañar a las empresas en su proceso de madurez digital</strong>,
    transformando su tecnología de forma escalonada —desde su presencia en el mercado hasta la
    automatización total de sus operaciones— para liberar el máximo potencial de sus equipos,
    multiplicar sus ingresos y lograr una operación eficiente y escalable.
  </p>
  <p class="mision__sub" data-i18n-en="I'm not a website programmer. I'm the strategic partner who walks with your business from Level 1 to Level 3 of the Digital Maturity Map.">
    No soy un programador de páginas web. Soy el socio estratégico que acompaña a tu negocio
    desde el Nivel 1 hasta el Nivel 3 del Mapa de Madurez Digital.
  </p>
</section>

<style>
  .mision {
    background: #000;
    color: #ffffff;
    padding: 2.5rem 2rem;
    margin-bottom: 3rem;
  }
  .mision__lead {
    font-size: 1.15rem;
    line-height: 1.7;
    margin: 0 0 1.25rem;
    text-wrap: pretty;
  }
  .mision__lead strong {
    color: #ffffff;
    font-weight: 700;
  }
  .mision__sub {
    font-size: 0.95rem;
    color: #d2d2d7;
    margin: 0;
    line-height: 1.6;
  }
  @media (min-width: 768px) {
    .mision { padding: 3rem 3rem; }
    .mision__lead { font-size: 1.25rem; }
  }

  /* Cuerpo de about con padding consistente con el strip .mision
     para que el texto alinee visualmente con el contenido del strip negro. */
  .about-body { padding: 0 2rem; }
  @media (min-width: 768px) {
    .about-body { padding: 0 3rem; }
  }
</style>

<div class="about-body" markdown="1">

## <span data-i18n-en="Who's behind">Quién hay detrás</span>

<p data-i18n-en-html="I'm <strong>Elías Luis Jurado Santos</strong>, a developer based in Miraflores, Lima.">Soy <strong>Elías Luis Jurado Santos</strong>, desarrollador con base en Miraflores, Lima.</p>

<p data-i18n-en-html="My path into software development wasn't linear. I started studying <strong>History and Cultural Management at Universidad de Piura</strong> and worked on social projects in rural areas of northern Peru. I was interested — and still am — in how culture manifests today: the urban, the popular, what people actually live.">Mi camino al desarrollo de software no fue lineal. Empecé estudiando <strong>Historia y Gestión Cultural en la Universidad de Piura</strong> y trabajé en proyectos sociales en zonas rurales del norte del país. Me interesaba —y me sigue interesando— cómo la cultura se manifiesta hoy: lo urbano, lo popular, lo que la gente realmente vive.</p>

<p data-i18n-en="When I moved to Lima, that field barely existed in the city. I studied Computing and Informatics and entered software development through a side door: a Flutter project got me my first job as a software assistant before I finished my technical studies. What I discovered ordered my mind — code has a clear logic of 'works or doesn't work', no middle ground, and that discipline changed me.">Cuando me mudé a Lima, ese rubro casi no existía en la ciudad. Estudié Computación e Informática y entré al desarrollo de software por una puerta lateral: un proyecto en Flutter me consiguió mi primer empleo como asistente de software antes de terminar mis estudios técnicos. Lo que descubrí me ordenó la cabeza — el código tiene una lógica clara de "funciona o no funciona", sin puntos medios, y esa disciplina me cambió.</p>

<p data-i18n-en="Today I combine both: the sensitivity of someone from the humanities — understanding the client's context, reading aesthetics, narrating well — with the technical discipline to build products that work. It's a rare mix in my field, and I think that combination is what makes me useful for businesses that don't just want a website: they want their site to say something.">Hoy combino las dos cosas: la sensibilidad de quien viene de humanidades —entender el contexto del cliente, leer la estética, narrar bien— con la disciplina técnica para construir productos que funcionan. Es un mix raro en mi rubro, y creo que esa mezcla es lo que me hace útil para negocios que no quieren solo un sitio web: quieren que su sitio diga algo.</p>

## <span data-i18n-en="How I work — the principles">Cómo trabajo — los principios</span>

<p data-i18n-en="Three convictions structure every project:">Tres convicciones estructuran cada proyecto:</p>

<div class="principios">
  <article class="principio">
    <h3 data-i18n-en="Structure">Estructura</h3>
    <p data-i18n-en="Code has a clear logic: it works or it doesn't. Every delivery is solid, documented, maintainable when your business grows. No shortcuts that break in 6 months.">El código tiene una lógica clara: funciona o no funciona. Cada entrega es sólida, documentada, mantenible cuando tu negocio crezca. Sin atajos que se rompan en 6 meses.</p>
  </article>
  <article class="principio">
    <h3 data-i18n-en="Reciprocity">Reciprocidad</h3>
    <p data-i18n-en="&quot;If you succeed, I succeed.&quot; I don't sell the cheapest work on the market — I sell what you'll be able to defend when your client asks. Your prosperity is the condition of mine.">"Si tú tienes éxito, yo tengo éxito." No vendo el trabajo más barato del mercado, vendo el que vas a poder defender cuando tu cliente lo pregunte. Tu prosperidad es la condición de la mía.</p>
  </article>
  <article class="principio">
    <h3 data-i18n-en="Possibility">Posibilidad</h3>
    <p data-i18n-en="No business is condemned to stay small. The 'can't be done' of the status quo is a hypothesis to refute, not a verdict. My job is to give you tools that open paths where they seemed closed.">Ningún negocio está condenado a ser pequeño. El "no se puede" del statu quo es una hipótesis a refutar, no un veredicto. Mi trabajo es darte herramientas que abran caminos donde parecían cerrados.</p>
  </article>
</div>

<style>
  .principios {
    display: grid;
    gap: 1.5rem;
    margin: 2rem 0 3rem;
  }
  @media (min-width: 768px) {
    .principios { grid-template-columns: repeat(3, 1fr); }
  }
  .principio {
    background: #f5f5f7;
    padding: 1.5rem;
  }
  .principio h3 {
    margin: 0 0 0.5rem;
    font-size: 1.2rem;
    color: #000;
  }
  .principio p {
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.6;
    color: #424245;
  }
</style>

## <span data-i18n-en="Tech stack">Stack técnico</span>

<p data-i18n-en="What I use to build, in order of real use in SMB projects:">Lo que uso para construir, en orden de uso real en proyectos de pymes:</p>

- <strong data-i18n-en="Modern web:">Web moderno:</strong> Next.js, TypeScript, TailwindCSS, Jekyll
- <strong data-i18n-en="Backend and data:">Backend y datos:</strong> Supabase (Postgres + Auth + Storage), .NET, ASP.NET Web API, EF Core
- <strong data-i18n-en="Hosting and deploy:">Hosting y deploy:</strong> Vercel, GitHub Actions, Docker
- <strong data-i18n-en="Automation:">Automatización:</strong> n8n, Make, scripts a medida en Python/Node
- <strong data-i18n-en="Mobile and multiplatform:">Mobile y multiplataforma:</strong> Flutter, .NET MAUI
- <strong data-i18n-en="Databases:">Bases de datos:</strong> PostgreSQL, MS SQL Server, MongoDB, Firestore

<p data-i18n-en="Robust but adaptable stack. If your business needs something different, we evaluate it in the initial diagnosis.">Stack robusto pero adaptable. Si tu negocio necesita algo distinto, lo evaluamos en el diagnóstico inicial.</p>

## <span data-i18n-en="Billing — formal receipts">Facturación — comprobantes formales</span>

<p data-i18n-en-html="I work formally and on the books. For every service I issue an <strong>electronic receipt</strong> through SUNAT: an <strong>electronic invoice (factura)</strong> if your business has a RUC — so you can use it as a deductible expense and tax credit — or an <strong>electronic sales slip (boleta)</strong> if you're a final consumer.">Trabajo de manera formal y en regla. Por cada servicio emito un <strong>comprobante electrónico</strong> ante SUNAT: <strong>factura electrónica</strong> si tu negocio tiene RUC —para que la uses como gasto deducible y crédito fiscal— o <strong>boleta de venta electrónica</strong> si eres consumidor final.</p>

<p data-i18n-en-html="My RUC is <strong>10434645421</strong>. If you need the invoice with specific tax details, just send them to me when we close the agreement.">Mi RUC es <strong>10434645421</strong>. Si necesitas la factura con datos tributarios específicos, me los pasas al cerrar el acuerdo.</p>

<p data-i18n-en-html="<strong>All my prices include VAT (IGV).</strong> I accept every payment method — card, bank transfer, Yape and Plin. <strong>Pay by bank transfer and you get a 3% discount.</strong>"><strong>Todos mis precios incluyen IGV.</strong> Acepto todos los medios de pago — tarjeta, transferencia, Yape y Plin. <strong>Si pagas por transferencia bancaria, obtienes un 3% de descuento.</strong></p>

</div>

<section class="jaguar-origen">
  <img class="jaguar-origen__img"
       src="{{ '/assets/images/mascota/jaguar-editorial.png' | relative_url }}"
       alt="El jaguar — mascota de la marca Elías Jurado" loading="lazy" />
  <div class="jaguar-origen__texto">
    <p class="jaguar-origen__kicker" data-i18n-en="The mascot">La mascota</p>
    <h2 class="jaguar-origen__title" data-i18n-en="The jaguar">El jaguar</h2>
    <p data-i18n-en="It was born on a court: the jersey for my kids' school family-day cup had a panther. I took it and translated it into the brand's language — matte black, clean geometry, no noise.">
      Nació en una cancha: la camiseta de la Copa Día de la Familia del colegio de mis hijos
      tenía una pantera. La tomé y la traduje al lenguaje de la marca — negro mate, geometría
      limpia, sin estridencia.</p>
    <p data-i18n-en="The jaguar (otorongo) isn't decoration: it's a top-tier Andean icon (Moche ceramics, the Chavín feline). It connects to my background in History without folkloric costume.">
      El otorongo no es adorno: es ícono andino de primer nivel (cerámica Moche, felino de
      Chavín). Conecta con mi formación en Historia sin disfraz folclórico.</p>
    <p data-i18n-en="It has no eyes or mouth: it's pure silhouette. Just like the way I work — the jaguar holds the brand's presence, but the protagonist is your business, not it.">
      No tiene ojos ni boca: es pura silueta. Igual que mi forma de trabajar — el jaguar
      sostiene la presencia de la marca, pero el protagonista es tu negocio, no él.</p>
  </div>
</section>

<style>
  .jaguar-origen {
    background: #0a0a0c;
    color: #d2d2d7;
    display: grid;
    gap: 2rem;
    align-items: center;
    padding: 2.5rem 2rem;
    margin: 3rem 0;
  }
  .jaguar-origen__img { width: 100%; max-width: 360px; height: auto; justify-self: center; }
  .jaguar-origen__kicker {
    font-size: .8rem; letter-spacing: .12em; text-transform: uppercase;
    color: #6e6e73; margin: 0 0 .4rem;
  }
  .jaguar-origen__title { color: #f5f5f7; font-weight: 800; margin: 0 0 1rem; font-size: 2rem; }
  .jaguar-origen__texto p { line-height: 1.7; margin: 0 0 .9rem; font-size: 1rem; }
  @media (min-width: 768px) {
    .jaguar-origen { grid-template-columns: 360px 1fr; gap: 3rem; padding: 3rem; }
  }
</style>

{% comment %}
============================================================================
SECCIÓN RSE — LISTA PERO OCULTA (no se renderiza mientras esté en este bloque).
Activar cuando exista el primer proyecto real de impacto social (p. ej. el
colegio de los hijos de Elías u otra causa). Para publicar: eliminar la línea
del tag de apertura de comentario Liquid (justo arriba de <section class="rse">)
y la del tag de cierre (justo debajo de </style>, antes del CTA). Antes de
publicar, reemplazar el placeholder de casos por el caso real. Nota de copy:
NO usar "pro bono" (jerga) — el copy dice "elijo una causa que me mueve / sin
cobrar / sin costo", tono directo y de decisión personal.
============================================================================

<section class="rse">
  <p class="rse__kicker" data-i18n-en="Social responsibility">Responsabilidad social</p>
  <h2 class="rse__title" data-i18n-en="Digital maturity isn't only for those who can pay for it">La madurez digital no es solo para quien puede pagarla</h2>
  <p class="rse__lead" data-i18n-en-html="Every so often I <strong>choose a cause that moves me</strong> and support it at no charge — the same Digital Maturity Map I use with businesses, put to work for something worth it. Same method, same standard, no cost.">
    Cada cierto tiempo <strong>elijo una causa que me mueve</strong> y la acompaño sin cobrar —el mismo
    Mapa de Madurez Digital que uso con las empresas, puesto al servicio de algo que vale la pena.
    El mismo método, el mismo estándar, sin costo.
  </p>
</section>

<div class="rse-pilares">
  <div class="rse-pilar">
    <h3 data-i18n-en="Who I support">A quién acompaño</h3>
    <p data-i18n-en="Non-profits, social ventures and community initiatives with real impact and a limited budget.">Organizaciones sin fines de lucro, emprendimientos sociales e iniciativas comunitarias con impacto real y presupuesto acotado.</p>
  </div>
  <div class="rse-pilar">
    <h3 data-i18n-en="What I contribute">Qué aporto</h3>
    <p data-i18n-en="Web presence, e-commerce or automation — the same Digital Maturity Map, applied to their cause so their team spends less time on operations and more on their mission.">Presencia web, e-commerce o automatización —el mismo Mapa de Madurez Digital, aplicado a su causa para que su equipo dedique menos tiempo a operar y más a su misión.</p>
  </div>
  <div class="rse-pilar">
    <h3 data-i18n-en="Why">Por qué</h3>
    <p data-i18n-en="Technology multiplies the reach of those already doing good. Sharing it where it's needed most is part of how I understand my profession.">La tecnología multiplica el alcance de quienes ya hacen el bien. Compartirla donde más se necesita es parte de cómo entiendo mi profesión.</p>
  </div>
</div>

<!-- PLACEHOLDER: reemplazar por casos reales de RSE cuando existan.
     Mantener formato sobrio, sin cifras inventadas. Ejemplo de estructura:
<p class="rse-casos-intro" data-i18n-en="Some of the organizations I've supported:">Algunas de las organizaciones que he acompañado:</p>
<ul>
  <li><strong>Nombre de la organización</strong> — qué se construyó y qué resultado tuvo.</li>
</ul>
-->

<p class="rse-cta-line" data-i18n-en-html="Run a cause that's worth it and need a digital hand? <a href='/contact/'>Tell me about it</a> — every so often I choose one to support at no charge.">¿Tienes una causa que vale la pena y necesitas una mano digital? <a href="/contact/">Cuéntame</a> —cada cierto tiempo elijo una para acompañar sin cobrar.</p>

<style>
  .rse {
    background: #000;
    color: #ffffff;
    padding: 2.5rem 2rem;
    margin: 3rem 0 0;
  }
  .rse__kicker {
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #d2d2d7;
    margin: 0 0 0.75rem;
  }
  .rse__title {
    font-size: 1.5rem;
    font-weight: 800;
    line-height: 1.25;
    margin: 0 0 1.25rem;
    color: #ffffff;
  }
  .rse__lead {
    font-size: 1.05rem;
    line-height: 1.7;
    margin: 0;
    color: #f5f5f7;
    text-wrap: pretty;
  }
  .rse__lead strong { color: #ffffff; font-weight: 700; }

  .rse-pilares {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1px;
    background: #e0e0e0;
    border: 1px solid #e0e0e0;
    margin: 0 0 2rem;
  }
  .rse-pilar {
    background: #f5f5f7;
    padding: 1.5rem;
  }
  .rse-pilar h3 {
    margin: 0 0 0.5rem;
    font-size: 1.1rem;
    font-weight: 600;
    color: #000;
  }
  .rse-pilar p {
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.6;
    color: #606060;
  }
  .rse-cta-line {
    font-size: 0.95rem;
    line-height: 1.6;
    color: #243038;
  }
  .rse-cta-line a { color: #000; font-weight: 600; }

  @media (min-width: 768px) {
    .rse { padding: 3rem 3rem; }
    .rse__title { font-size: 1.85rem; }
    .rse-pilares { grid-template-columns: repeat(3, 1fr); }
  }
</style>
{% endcomment %}

<div class="about-cta">
  <a href="/contact/" class="btn btn--primary btn--lg" data-i18n-en="Let's talk">Hablemos</a>
</div>

<style>
  .about-cta {
    text-align: center;
    margin-top: 3rem;
  }

  @media (max-width: 767px) {
    .about-cta { margin-top: 2.5rem; }
  }
</style>
