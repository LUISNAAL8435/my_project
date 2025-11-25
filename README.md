# Expendiente Digital "FisioCenter" - Aplicación Web para la universidad "Modelo" de Mérida

Esta aplicación web está diseñada para apoyar a los residentes que realizan sus prácticas de fisioterapia de la universidad que lleva por nombre "Modelo" que se encuentra ubicado en Mérida. Facilita la gestión, seguimiento y organización para que los residentes tengan una buena administración sobre sus pacientes.

## 🧾 Descripción general
La plataforma permite crear cuentas para los administradores que están a cargo de los residentes, lo administradores podrán entrar a su perfil y podrán dar de alta a los residentes, de igual manera los administradores podrán observar las actividades que realiza el residente como, por ejemplo, la cantidad de pacientes que tienen registrados, las citas realizadas y las próximas.

La plataforma les permitirá a los residentes iniciar sesión y entrar en su perfil, en su perfil podrán registrar a sus pacientes, podrán llevar el control de sus actividades, podrán registrar todos los datos de sus pacientes, tener un mejor control de la información de sus clientes, podrán agendar citas.
### 👤 Administrador

Crea cuentas de fisioterapeutas.

Gestiona accesos.

### 🧑‍⚕️ Fisioterapeuta

Inicia sesión con su cuenta asignada.

Registra pacientes.

Agenda y consulta citas.

Realiza evaluaciones de dolor, marcha, movilidad, etc.

Administra y consulta el historial clínico de sus pacientes.

## 🚀 Características principales

✔️ Login de administrador y fisioterapeuta

✔️ Registro y gestión de pacientes

✔️ Agenda de citas

✔️ Evaluación clínica de pacientes

✔️ Dashboard del fisioterapeuta

✔️ Backend con FastAPI

✔️ PostgreSQL en contenedor Docker

✔️ Frontend en Angular

✔️ Arquitectura modular y escalable

## 🛠 Tecnologías utilizadas

### Frontend
- Angular **19.2.15**
- Angular CLI **19.2.18**
- TypeScript **5.7.3**
- RxJS **7.8.2**
- zone.js **0.15.1**
- TailwindCSS

### Entorno
- Versión de Node.js

Este proyecto requiere una versión específica de Node.js compatible con Angular 19:

Node.js: ^18.19.1 || ^20.11.1 || >=22.0.0

Es decir, debes usar alguna de estas versiones:

Node 18.19.1 o superior dentro de la serie 18

Node 20.11.1 o superior dentro de la serie 20

Node 22 o superior
- npm **10.9.3**

### Backend

FastAPI

Python 3.11.9

SQLAlchemy / SQLModel

Uvicorn

### Base de datos

PostgreSQL

Contenedor Docker

## 🏗 Arquitectura del proyecto

El proyecto sigue una arquitectura de 3 capas:

Frontend Angular

API REST FastAPI

Base de datos PostgreSQL en Docker

Comunicación: Frontend → FastAPI → PostgreSQL

## 📁 Estructura de carpetas

my-project/

│── backend/             # Código de FastAPI

│── frontend/            # Código de Angular

│── .env                 # Variables de entorno

│── .gitignore

│── docker-compose.yml   # Orquestación de servicios

## ▶️ Instalación y ejecución en Linux (Ubuntu)
### 1 Clonar el repositorio
```bash
git clone https://github.com/usuario/my-project.git
cd my-project
```

### 2 Instalar Node.js con nvm
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm intall 22.19.0
nvm use 22.19.0
```

### 🔧 Backend – FastAPI
#### Crear entorno virtual
```bash
python3 -m venv venv
source venv/bin/activate
```

### Instalar dependencias
```bash
pip install -r requirements.txt
```

### Base de datos – Docker PostgreSQL
#### Instalar Docker (si no está instalado)
```bash
sudo apt update
sudo apt install docker.io docker-compose -y
```
### Subir PostgreSQL con Docker

#### Asegúrate de estar en la carpeta principal del proyecto:
```bash
cd ../
sudo docker-compose up -d
```
### 🚀 Ejecutar Backend
```bash
cd backend
source venv/bin/activate
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```
### Backend disponible en:
👉 http://localhost:8000

👉 Documentación automática Swagger: http://localhost:8000/docs

### Ejecutar el Frontend Angular
```bash
cd frontend
npm install
npx ng serve
```

### Frontend disponible en:
👉 http://localhost:4200

## 👥 Autores
- Luis Enrique Ku Naal
- Guadalupe de los Angeles Huchim Morales
- Jesús Eduardo Ávila Chim
- Luis Enrique Zib Pech





