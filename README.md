# UTN FRBA TACS 2021-1C

##  Trabajo Practico 2021 1C

* [TACS Home Page](https://www.tacs-utn.com.ar/)
* [Documento del enunciado](https://docs.google.com/document/d/e/2PACX-1vSDeXS8A44GMMKxL47FTspYC6_4BXiWP2_lwo2Oiy4P7oRXORfseOdQ9F3K8vZ_xyHNPf6euMP1wEIV/pub)

## Requisitos
* Docker-compose

## Instrucciones para iniciar la aplicación
* Una vez clonado, dentro del directorio del proyecto, ejecutar:
  - Para el modo desarrollador 
    ```console
    docker-compose -f dev-compose.yml up
    ```
  - Para levantar una versión estable
    ```console
    docker-compose up
    ```
* Acceder desde el navegador a la url local generada, en el path `/` o `/home`
* Ambas opciones levantan una imagen estable del server para poder interactuar sin problemas
