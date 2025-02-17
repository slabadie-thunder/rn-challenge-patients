<p align="center"><a href="https://lightit.io" target="_blank"><img src="https://lightit.io/images/Logo_purple.svg" width="400"></a></p>

<!-- <p align="center">
<a href="https://travis-ci.org/laravel/framework"><img src="https://travis-ci.org/laravel/framework.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p> -->

We help digital health startups, clinics, and medtech companies ideate, design, and develop custom web & mobile applications that transform the future of healthcare.

Requirements:

- Node >= 20 LTS

## Patients App: React Native

El proyecto usa NativeWind, por lo cual se deben usar estilos de TailwindCSS.
Usar FlashList, NativeWind, React Query, Zustand
Como opcional hacer que la store persista en el local storage

La app debe contar con dos bottom tabs:

Para la primera se debe realizar una listado de pacientes, con la posibilidad de agregar, editar y eliminar pacientes.

- Cada paciente debe tener un nombre, apellido, descripcion, una url y una foto.
- Se debe poder buscar un paciente por nombre utilizando debounce y search params en el endpoint de pacientes.
- Se debe poder refrescar la lista de pacientes utilizando pull to refresh (RefreshControl).
- Para ver toda la descripcion del paciente se deben usar animaciones.
- Para eliminar un paciente se debe usar swipe.
- Para agregar y editar un paciente se debe usar un modal (bottom sheet).
- Cada paciente se puede marcar como "favorito", o que es mi paciente (utilizar swipe).

En la segunda se deben listar los pacientes favoritos (o los que serian mis pacientes).
