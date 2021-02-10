import Product from '../models/product';

const PRODUCTS = [
  new Product(
    'p1',
    'u1',
    'Camiseta Roja',
    'https://cdn.pixabay.com/photo/2016/10/02/22/17/red-t-shirt-1710578_1280.jpg',
    'Camiseta roja perfecta para lucir en verano',
    29.99
  ),
  new Product(
    'p2',
    'u1',
    'Alfombra Azul',
    'https://images.pexels.com/photos/6292/blue-pattern-texture-macro.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    'Alfombra de gran acabado que adornará tu casa al siguiente nivel',
    99.99
  ),
  new Product(
    'p3',
    'u2',
    'Jarra de Café',
    'https://images.pexels.com/photos/160834/coffee-cup-and-saucer-black-coffee-loose-coffee-beans-160834.jpeg?cs=srgb&dl=bean-beans-black-coffee-160834.jpg&fm=jpg',
    'Para tomar tus bebidas favoritas con estilo',
    8.99
  ),
  new Product(
    'p4',
    'u3',
    'El Libro - Edición Limitada',
    'https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg?cs=srgb&dl=blur-blurred-book-pages-46274.jpg&fm=jpg',
    "Un gran libro de edición limitada que te mantendra leyendo todo el día",
    15.99
  ),
  new Product(
    'p5',
    'u3',
    'PowerBook',
    'https://get.pxhere.com/photo/laptop-computer-macbook-mac-screen-water-board-keyboard-technology-air-mouse-photo-airport-aircraft-tablet-aviation-office-black-monitor-keys-graphic-hardware-image-pc-exhibition-multimedia-calculator-vector-water-cooling-floppy-disk-phased-out-desktop-computer-netbook-personal-computer-computer-monitor-electronic-device-computer-hardware-display-device-448748.jpg',
    'Increible computador de última generación y especificaciones de alta gama',
    2299.99
  ),
  new Product(
    'p6',
    'u1',
    'Lapiz y Papel',
    'https://cdn.pixabay.com/photo/2015/10/03/02/14/pen-969298_1280.jpg',
    "Para tomar apuntes de cualquier evento ocurrido en tu interesante vida",
    5.49
  )
];

export default PRODUCTS;
