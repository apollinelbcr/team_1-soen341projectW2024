COPY vehicles(id, name_vehicle, image, vehicle_type, vehicle_category, vehicle_transmission, status)
FROM '/docker-entrypoint-initdb.d/inflation.csv/data/vehicles.csv' DELIMITER ',' CSV HEADER;