export const SIDEBAR_LINKS = [
  {
    moduleName: 'Cargar informes',
    icon:'upload_file',
    type: 'simple',
    link: '/dashboard/cargar-informes'
  },
  {
    moduleName: 'Mis asesorias',
    icon:'cast_for_education',
    type: 'multi',
    views: [{ viewName: 'Registrar', link: '/asesorias/registrar' },
    { viewName: 'Listar', link: '/dashboard/asesorias/listar' }
  ]
  },
  {
    moduleName: 'Cargar estudiantes',
    icon:'group_add',
    type: 'simple',
    link: '/dashboard/cargar-estudiantes'
  },
  {
    moduleName: 'Estadisticas y reportes',
    icon:'query_stats',
    type: 'multi',
    views: [{ viewName: 'Ver estadisticas', link: '/dashboard/estadisticas' }]
  },
  {
    moduleName: 'Registro de Coordinadores',
    icon:'person_add_alt_1',
    type: 'simple',
    link: '/dashboard/registro-coordinadores'
  },
  {
    moduleName: 'Convocatorias',
    icon:'move_to_inbox',
    type: 'multi',
    views: [{ viewName: 'Crear convocatoria', link: '/dashboard/convocatoria-crear' }
  ,{ viewName: 'Consultar convocatoria', link: '/convocatoria-listar' },
  { viewName: 'Aprobaciones', link: '/convocatoria-aprobar' }]
  },
  {
    moduleName: 'Amigos académicos',
    icon:'school',
    type: 'simple',
    link: '/dashboard/amigos-academicos'
  },
  {
    moduleName: 'Revisar informes',
    icon:'plagiarism',
    type: 'simple',
    link: '/dashboard/informes-revisar'
  },
  {
    moduleName: 'Asignación de horarios',
    icon:'manage_history',
    type: 'simple',
    link: '/dashboard/asignar-horarios'
  },
  {
    moduleName: 'Cargar cursos',
    icon:'upload',
    type: 'simple',
    link: '/dashboard/cargar-cursos'
  }
];
