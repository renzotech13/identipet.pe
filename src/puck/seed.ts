import type { Data } from "@measured/puck";

/** Diseño actual de la landing representado como bloques de Puck (editable). */
export const defaultHomeData: Data = {
  root: { props: {} },
  zones: {},
  content: [
    {
      type: "SiteHeaderBlock",
      props: {
        id: "SiteHeaderBlock-1",
        tagline: "IDENTIDAD PARA TODA LA VIDA",
        nav: [{ label: "Beneficios" }, { label: "Servicios" }, { label: "Marketplace" }, { label: "Veterinarias" }, { label: "Blog" }, { label: "Contacto" }],
        loginLabel: "Iniciar sesión",
        registerLabel: "Registrar mi mascota",
      },
    },
    {
      type: "HeroBlock",
      props: {
        id: "HeroBlock-1",
        titleStart: "Tu mascota merece una identidad para",
        titleHighlight: "toda la vida",
        subtitle: "La plataforma que protege su identidad, organiza su historial médico, te conecta con servicios y te da beneficios exclusivos.",
        btnPrimary: "Crear la identidad de mi mascota",
        btnSecondary: "Ver cómo funciona",
        heroImage: "/img-bg-of.jpg",
        phoneImage: "/img-mockup.png",
        trust: [
          { top: "+25K mascotas", bottom: "ya registradas" },
          { top: "100% Seguro", bottom: "y confiable" },
          { top: "4.9/5", bottom: "Valoración de usuarios" },
        ],
      },
    },
    {
      type: "FeatureBarBlock",
      props: {
        id: "FeatureBarBlock-1",
        items: [{ label: "Identidad Digital" }, { label: "Historial Médico" }, { label: "Beneficios Exclusivos" }, { label: "Marketplace de Productos" }, { label: "Encuentra Servicios" }],
      },
    },
    {
      type: "NeedsBlock",
      props: {
        id: "NeedsBlock-1",
        leftTitle: "Todo lo que tu mascota necesita",
        leftHighlight: "en un solo lugar",
        miniItems: [{ label: "Veterinarias" }, { label: "Historial Médico" }, { label: "Alimentos" }, { label: "Beneficios" }, { label: "Adopciones" }, { label: "Emergencias" }, { label: "Paseadores" }, { label: "Y mucho más" }],
        rightTitle: "Protección, salud y beneficios para",
        rightHighlight: "una vida increíble",
        benefits: [
          { title: "Tu mascota siempre identificada", text: "Comparte su información en segundos si se pierde." },
          { title: "Historial médico siempre disponible", text: "Toda su información organizada y segura." },
          { title: "Descuentos exclusivos", text: "Ahorra en cientos de establecimientos y marcas aliadas." },
        ],
        linkLabel: "Conoce todos los beneficios",
      },
    },
    {
      type: "StatsRibbonBlock",
      props: {
        id: "StatsRibbonBlock-1",
        items: [{ value: "+25K", label: "Mascotas registradas" }, { value: "+8K", label: "Familias felices" }, { value: "+500", label: "Veterinarias aliadas" }, { value: "+120", label: "Ciudades" }],
      },
    },
    {
      type: "CardsRowBlock",
      props: {
        id: "CardsRowBlock-1",
        mkTitle: "Marketplace para tu mascota",
        products: [{ name: "Alimento Premium", price: "S/ 89.90" }, { name: "Collar GPS", price: "S/ 129.90" }, { name: "Snacks Naturales", price: "S/ 25.90" }, { name: "Cama Antiestrés", price: "S/ 119.90" }],
        svTitle: "Encuentra servicios cerca de ti",
        services: [{ label: "Veterinarias" }, { label: "Hoteles" }, { label: "Peluquerías" }, { label: "Entrenadores" }],
        bnTitle: "Beneficios exclusivos",
        brands: [{}, {}, {}, {}, {}, {}],
      },
    },
    {
      type: "BrandStripBlock",
      props: { id: "BrandStripBlock-1", title: "Empresas y marcas que confían en nosotros", brands: [{}, {}, {}, {}, {}, {}, {}, {}, {}] },
    },
    {
      type: "TestimonialsBlock",
      props: {
        id: "TestimonialsBlock-1",
        title: "Lo que dicen nuestros Pet Parents",
        items: [
          { name: "María y Loki", quote: "IdentiPet me da tranquilidad sabiendo que Loki está siempre protegido." },
          { name: "Carlos y Nala", quote: "El historial médico de Nala siempre a la mano. Es súper completo y fácil de usar." },
          { name: "Ana y Max", quote: "Los beneficios y descuentos son increíbles, ya hemos ahorrado mucho." },
        ],
      },
    },
    {
      type: "AppCtaBlock",
      props: { id: "AppCtaBlock-1", title: "Descarga la app de", brand: "IdentiPet", subtitle: "Muy pronto podrás llevar todo IdentiPet en tu bolsillo." },
    },
  ],
};
