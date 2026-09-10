export const business = {
  phone: '045 851 1527', phoneHref: 'tel:0458511527',
  whatsapp: 'https://wa.me/393486646762?text=Ciao%2C%20vorrei%20ordinare%20una%20pizza.',
  menu: 'https://online.fliphtml5.com/iwommg/xypp/',
  maps: 'https://www.google.com/maps/search/?api=1&query=Pizzeria%20Ghiottone%20Via%20Bassone%2030a%20Basson%20Verona',
};
export const reviews = [
  { name: 'Elisa Solfa', text: 'Prendiamo molto spesso la pizza a domicilio ed è sempre buonissima! I ragazzi della pizzeria sempre gentili e molto professionali! La miglior pizzeria della zona!' },
  { name: 'Daniele Scotton', text: 'Servizio eccellente e pizza gran buona!' },
  { name: 'Pop Melania', text: 'Una delle migliori pizzerie della zona! L’impasto è soffice dentro e croccante fuori, condimenti abbondanti e di qualità.' },
  { name: 'Edoardo Sgarzoni', text: 'Buona pizza, possibilità di scegliere il tipo di impasto, puntuali, prezzi onesti. Consigliato!' },
  { name: 'Arianna', text: 'Ragazzi giovani e cortesi. Pizza molto buona.' },
];
export const hours = ['Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'].map(day => ({ day, time: '18:00–21:30' })).concat({day: 'Lunedì', time: 'Chiuso'});
// Le categorie sono una preview editoriale, non un catalogo di prodotti.
export const menuCategories = ['Le pizze', 'Gli impasti', 'I condimenti'];
