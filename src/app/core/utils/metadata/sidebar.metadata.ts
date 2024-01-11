export const SIDEBAR_LINKS = [
  {
    moduleName: 'Cargar informes',
    icon: 'upload_file',
    type: 'simple',
    link: '/dashboard/cargar-informes',
    permisses: ['academicFriend'],
  },
  {
    moduleName: 'Mis asesorias',
    icon: 'cast_for_education',
    type: 'multi',
    views: [
      { viewName: 'Registrar', link: '/dashboard/asesorias/registrar' },
      { viewName: 'Listar', link: '/dashboard/asesorias/listar' },
    ],
    permisses: ['academicFriend'],
  },
  {
    moduleName: 'Cargar estudiantes',
    icon: 'group_add',
    type: 'simple',
    link: '/dashboard/cargar-estudiantes',
    permisses:['director']
  },
  {
    moduleName: 'Estadisticas y reportes',
    icon: 'query_stats',
    type: 'multi',
    views: [{ viewName: 'Ver estadisticas', link: '/dashboard/estadisticas' }],
    permisses:['coordinator','director']
  },
  {
    moduleName: 'Registro de Coordinadores',
    icon: 'person_add_alt_1',
    type: 'simple',
    link: '/dashboard/registro-coordinadores',
    permisses:['director']
  },
  {
    moduleName: 'Convocatorias',
    icon: 'move_to_inbox',
    type: 'multi',
    views: [
      { viewName: 'Crear convocatoria', link: '/dashboard/convocatoria-crear' },
      { viewName: 'Consultar convocatoria', link: '/dashboard/convocatoria-consultar' },
      { viewName: 'Aprobaciones', link: '/dashboard/convocatoria-aprobar' },
    ],
    permisses:['coordinator','director']
  },
  {
    moduleName: 'Amigos académicos',
    icon: 'school',
    type: 'simple',
    link: '/dashboard/amigos-academicos',
    permisses:['coordinator','director']
  },
  {
    moduleName: 'Revisar informes',
    icon: 'plagiarism',
    type: 'simple',
    link: '/dashboard/informes-revisar',
    permisses:['coordinator']
  },
  {
    moduleName: 'Asignación de horarios',
    icon: 'manage_history',
    type: 'simple',
    link: '/dashboard/asignar-horarios',
    permisses:['coordinator','academicFriend']
  },
  {
    moduleName: 'Cargar cursos',
    icon: 'upload',
    type: 'simple',
    link: '/dashboard/cargar-cursos',
    permisses:['director']
  },
];
