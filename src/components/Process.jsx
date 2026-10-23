import { mediaData } from '../data/mediaData.js';

function Process() {
  return (
    <section
      className="section-spacing bg-technical-ivory text-graphite"
      id="proceso"
    >
      <div className="section-container">
        <div className="mb-8 max-w-3xl sm:mb-10">
          <p className="section-kicker">
            ¿Cómo funciona?
          </p>

          <h2 className="section-title">
            Tu pedido en 5 pasos.
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-graphite/65 sm:text-base">
            Elige tu diseño, aprueba la propuesta y nosotros nos encargamos del
            resto. Un proceso simple para que recibas un producto único y
            personalizado.
          </p>
        </div>

        <img
          src={mediaData.images.pedido}
          alt="Proceso para realizar un pedido personalizado en Opción Laser"
          className="mx-auto w-full max-w-md rounded-2xl shadow-lg lg:max-w-2xl"
          loading="lazy"
        />
      </div>
    </section>
  );
}

export default Process;