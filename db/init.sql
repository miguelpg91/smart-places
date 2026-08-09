CREATE TABLE places (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    province TEXT,
    city TEXT,
    type TEXT,
    price_per_night INTEGER,
    quiet BOOLEAN DEFAULT false,
    has_water BOOLEAN DEFAULT false,
    near_lake BOOLEAN DEFAULT false,
    tags TEXT[],
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    image_url TEXT
);

INSERT INTO places (
    id,
    title,
    description,
    province,
    city,
    type,
    price_per_night,
    quiet,
    has_water,
    near_lake,
    tags,
    latitude,
    longitude,
    image_url
) VALUES

(1, 'Mirador del Embalse', 'Zona con vistas espectaculares', 'Jaén', 'La Iruela', 'Parking', NULL, true, false, true, ARRAY['mirador','vistas'], 37.914300, -3.003800, 'https://res.cloudinary.com/dw4ydnv6o/image/upload/v1783968127/mirador-del-embalse_sqam85.jpg'),

(2, 'Área Natural Río Tajo', 'Zona junto al río ideal para desconectar', 'Toledo', 'Talavera de la Reina', 'Área Camper', 8, true, true, true, ARRAY['pesca'], 39.958800, -4.832700, 'https://res.cloudinary.com/dw4ydnv6o/image/upload/v1783968126/area-natural-rio-tajo_ru2ltr.jpg'),

(3, 'Camping Costa Azul', 'Junto a la playa', 'Málaga', 'Marbella', 'Camping', 25, false, true, false, ARRAY['baño'], 36.509900, -4.885600, 'https://res.cloudinary.com/dw4ydnv6o/image/upload/v1783968126/camping-costa-azul_lcl1su.jpg'),

(5, 'Parking Sierra Nevada', 'Parking amplio cerca de rutas de montaña', 'Granada', 'Pradollano', 'Parking', NULL, true, false, true, ARRAY['senderismo','esquí'], 37.095600, -3.399400, 'https://res.cloudinary.com/dw4ydnv6o/image/upload/v1783968127/parking-sierra-nevada_uabxat.avif'),

(6, 'Camping Laguna Verde', 'Camping tranquilo junto a una laguna', 'Cuenca', 'Uña', 'Camping', 18, true, true, true, ARRAY['baño'], 40.223900, -1.979700, 'https://res.cloudinary.com/dw4ydnv6o/image/upload/v1783968126/camping-laguna-verde_kwwamx.jpg'),

(7, 'Zona Descanso Costa Brava', 'Área de descanso cerca del mar', 'Girona', 'Tossa de Mar', 'Área Camper', 12, false, true, false, ARRAY['baño','atardecer'], 41.720000, 2.930000, 'https://res.cloudinary.com/dw4ydnv6o/image/upload/v1783968126/camping-car-costa-brava-jpg_wenacu.jpg'),

(8, 'Refugio del Bosque', 'Lugar aislado en plena naturaleza', 'Asturias', 'Cangas de Onís', 'Parking', NULL, true, false, true, ARRAY['senderismo'], 43.350800, -5.129600, 'https://res.cloudinary.com/dw4ydnv6o/image/upload/v1783968128/refugio-del-bosque_cee7tc.jpg'),

(9, 'Mirador del Acantilado', 'Parking con vistas espectaculares al mar, ideal para ver el atardecer.', 'Asturias', 'Llanes', 'Lugar libre', NULL, true, false, false, ARRAY['mirador','vistas','atardecer'], 43.419600, -4.754500, 'https://res.cloudinary.com/dw4ydnv6o/image/upload/v1783968127/mirador-acantilado_aa4nze.jpg'),

(10, 'Área Recreativa El Robledal', 'Zona tranquila con mesas y barbacoas.', 'León', 'Riaño', 'Lugar libre', NULL, true, true, false, ARRAY['picnic','barbacoa'], 42.974400, -5.003400, 'https://res.cloudinary.com/dw4ydnv6o/image/upload/v1783968125/area-recreativa-el-robledal_hzfq5m.jpg'),

(11, 'Camping Sierra Alta', 'Camping junto a rutas de senderismo.', 'Huesca', 'Benasque', 'Camping', 22, true, true, false, ARRAY['senderismo','vistas'], 42.605600, 0.523700, NULL),

(12, 'Puerto del Amanecer', 'Área camper junto al puerto, perfecta para pescar al amanecer.', 'A Coruña', 'Muros', 'Área de autocaravanas', 10, true, true, false, ARRAY['pesca','amanecer'], 42.776000, -9.060800, 'https://res.cloudinary.com/dw4ydnv6o/image/upload/v1783968127/puerto-del-amanecer_sqk2vu.jpg'),

(13, 'Camping Pet Nature', 'Camping que admite mascotas con amplias zonas verdes.', 'Cantabria', 'Potes', 'Camping', 18, true, true, false, ARRAY['mascotas','senderismo'], 43.154700, -4.621900, 'https://res.cloudinary.com/dw4ydnv6o/image/upload/v1783968126/camping-pet-nature_uwcp7m.jpg'),

(14, 'Lago Escondido', 'Zona de baño junto al lago con magníficas vistas.', 'Zamora', 'Sanabria', 'Lugar libre', NULL, true, true, true, ARRAY['baño','vistas'], 42.115800, -6.722600, 'https://res.cloudinary.com/dw4ydnv6o/image/upload/v1783968126/lago-escondido_wfojms.jpg'),

(15, 'Área Nevada', 'Área camper cerca de pistas de esquí.', 'Granada', 'Monachil', 'Área de autocaravanas', 15, false, true, false, ARRAY['esquí','vistas'], 37.161300, -3.596600, 'https://res.cloudinary.com/dw4ydnv6o/image/upload/v1783968125/area-nevada_lbo8jb.avif'),

(16, 'Merendero del Valle', 'Lugar perfecto para descansar y comer durante la ruta.', 'Navarra', 'Ochagavía', 'Lugar libre', NULL, true, true, false, ARRAY['picnic','senderismo'], 42.905900, -1.090700, 'https://res.cloudinary.com/dw4ydnv6o/image/upload/v1783968127/merendero-del-valle_epn9m1.avif');