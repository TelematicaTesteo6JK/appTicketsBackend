#!/bin/bash
#Como ya creamos una imagen de docker custom para este proyecto, lo único que
#hacemo en el script es generar el archivo para la conexion a AWS
#Creamos el PEM a partir del archivo generado por AWS
echo "${PEM_KEY_AWS}" > AWS.pem
chmod 700 AWS.pem
