import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsComponent } from './stats.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DatePipe } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreService } from 'src/app/core/services/core/core.service';
import { FileService } from '../../services/file/file.service';
import { of, throwError } from 'rxjs';
import { TABLE_COLUMNS_NAME_CONSULTANCY } from '../../metadata/consultancy/consultancy.metadata';
import { ConsultancyService } from '../../services/consultancy/consultancy.service';
import { Consultancy } from '../../models/Consultancy';
import { CoursesService } from '../../services/courses/courses.service';

describe('StatsComponent', () => {
  let component: StatsComponent;
  let fixture: ComponentFixture<StatsComponent>;
  let coreService: CoreService;
  let fileService: FileService;
  let consultancyService: ConsultancyService
  let courseService: CoursesService
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
        MatSnackBarModule,
        MatTabsModule,
        BrowserAnimationsModule
      ],
      providers:[
        DatePipe
      ],
      declarations: [StatsComponent]
    });
    fixture = TestBed.createComponent(StatsComponent);
    component = fixture.componentInstance;
    coreService = TestBed.inject( CoreService);
    fileService = TestBed.inject( FileService);
    courseService = TestBed.inject(CoursesService)
    consultancyService = TestBed.inject(ConsultancyService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should return an array with the last seven years', () => {
    const result = component.getLastSevenYears();

    // Expect the result to be an array
    expect(result).toEqual(jasmine.any(Array));

    // Expect the result array to have a length of 14 (7 years * 2)
    expect(result.length).toEqual(14);

    // Expect the labels to be formatted correctly
    for (let i = 0; i < 7; i++) {
      expect(result[i * 2].label).toEqual(`${new Date().getFullYear() - i}-1`);
      expect(result[i * 2 + 1].label).toEqual(`${new Date().getFullYear() - i}-2`);
    }

    // Expect the values to be formatted correctly
    for (let i = 0; i < 7; i++) {
      expect(result[i * 2].value).toEqual(`${new Date().getFullYear() - i}-1`);
      expect(result[i * 2 + 1].value).toEqual(`${new Date().getFullYear() - i}-2`);
    }
  });
  it('should download file successfully', () => {
    const fileUrl = 'valid_file_url';
    const blob = new Blob(['dummy content'], { type: 'application/octet-stream' });
    spyOn(fileService,'convertFile').and.returnValue(of(blob));
    spyOn(coreService,'showMessage')
    component.downloadConsultancies([],fileUrl);

    expect(fileService.convertFile).toHaveBeenCalledWith([]);
    expect(coreService.showMessage).toHaveBeenCalledWith('Archivo descargado con éxito');
  });
  it('should destroy the existing chart if there is one active', () => {
    // Mock the activeChart object
    const mockActiveChart = jasmine.createSpyObj('Chart', ['destroy']);
    component['activeChart'] = mockActiveChart;
  
    // Llamar a la función renderChart
    component.renderChart('testChartId');
  
    // Verificar que destroy fue llamado en el objeto activeChart
    expect(mockActiveChart.destroy).toHaveBeenCalled();
  });
  it('should not create a new chart if there is no active chart but chartElement is not available', () => {
    // Mock document.getElementById
    spyOn(document, 'getElementById').and.returnValue(null);
  
    // Llamar a la función renderChart
    component.renderChart('testChartId');
  
    // Verificar que no se creó un nuevo gráfico
    expect(component['activeChart']).toBeNull();
  });
  
  it('should not create a new chart if there is an active chart', () => {
    // Mock document.getElementById
    spyOn(document, 'getElementById').and.returnValue(document.createElement('div'));
  
    // Mock the activeChart object
    const mockActiveChart = jasmine.createSpyObj('Chart', ['destroy']);
    component['activeChart'] = mockActiveChart;
  
    // Llamar a la función renderChart
    component.renderChart('testChartId');
  
    // Verificar que no se creó un nuevo gráfico
    expect(mockActiveChart.destroy).toHaveBeenCalled();
    expect(component['activeChart']).toBe(mockActiveChart);  // Ajuste aquí
  });
  it('should call renderChart with the correct chart ID on tab change', () => {
    // Puedes espiar la función renderChart
    spyOn(component, 'renderChart');
  
    // Simular el cambio de pestaña a la primera (índice 0)
    component.onTabChange(0);
  
    // Verificar si renderChart se llamó con el ID correcto
    expect(component.renderChart).toHaveBeenCalledWith('consultancyXcourses');
  });

  it('should getConsultancyBetweenDatesService call countConsultanciesByCourse when findConsultancyBetweenDates return []>0', () => {
    const searchDates = {
      startDate: '2024-01-19T00:00:00',
      endDate: '2024-01-20T00:00:00',
    };
    const consultansyExample = {
      academicFriendEmail: '',
      studentCode: '',
      courseName: '',
      startDate: '',
      endDate: '',
      difficultiesEncountered: '',
      aspectsToImprove: '',
    };
  
    // Simular que countConsultanciesByCourse devuelve un array válido
    spyOn(component, 'countConsultanciesByCourse').and.returnValue([
      { courseName: 'Course A', consultancies: 2 },
      { courseName: 'Course B', consultancies: 1 },
    ]);
  
    spyOn(component, 'renderChart');
    spyOn(consultancyService, 'findConsultancyBetweenDates').and.returnValue(
      of([consultansyExample, consultansyExample, consultansyExample])
    );
  
    component.getConsultancyBetweenDatesService(searchDates);
  
    // Verificar si countConsultanciesByCourse se llamó con los datos correctos
    expect(component.countConsultanciesByCourse).toHaveBeenCalledWith(
      [consultansyExample, consultansyExample, consultansyExample]
    );
  
    // Verificar si renderChart se llamó
    expect(component.renderChart).toHaveBeenCalled();
  });
  it('should getConsultancyBetweenDatesService call countConsultanciesByCourse when findConsultancyBetweenDates return []>0', () => {
    const searchDates = {
      startDate: '2024-01-19T00:00:00',
      endDate: '2024-01-20T00:00:00',
    };
  
    spyOn(component, 'renderChart');
    spyOn(consultancyService, 'findConsultancyBetweenDates').and.returnValue(
      of([])
    );
  
    component.getConsultancyBetweenDatesService(searchDates);
  
    // Verificar si renderChart se llamó
    expect(component.allConsultancyTableData).toEqual([]);
    expect(component.renderChart).toHaveBeenCalled();
  });
  it('should getConsultancyBetweenDatesService call countConsultanciesByCourse when findConsultancyBetweenDates return []>0', () => {
    const searchDates = {
      startDate: '2024-01-19T00:00:00',
      endDate: '2024-01-20T00:00:00',
    };
  
    spyOn(coreService, 'showMessage');
    spyOn(consultancyService, 'findConsultancyBetweenDates').and.returnValue(
      throwError({error:{message:'ERROR'}})
    );
  
    component.getConsultancyBetweenDatesService(searchDates);
  
    expect(coreService.showMessage).toHaveBeenCalledWith('Error en la consulta de asesorías:ERROR');
  });
  it('should count consultancies by course', () => {
    
    // Crear un conjunto de asesorías de ejemplo
    const consultancies: Consultancy[] = [
      {
        academicFriendEmail: '',
        studentCode: '',
        courseName: 'Course1',
        startDate: '',
        endDate: '',
        difficultiesEncountered: '',
        aspectsToImprove: ''
      },
      {
        academicFriendEmail: '',
        studentCode: '',
        courseName: 'Course2',
        startDate: '',
        endDate: '',
        difficultiesEncountered: '',
        aspectsToImprove: ''
      },
      {
        academicFriendEmail: '',
        studentCode: '',
        courseName: 'Course1',
        startDate: '',
        endDate: '',
        difficultiesEncountered: '',
        aspectsToImprove: ''
      },
      {
        academicFriendEmail: '',
        studentCode: '',
        courseName: 'Course3',
        startDate: '',
        endDate: '',
        difficultiesEncountered: '',
        aspectsToImprove: ''
      },
      {
        academicFriendEmail: '',
        studentCode: '',
        courseName: 'Course2',
        startDate: '',
        endDate: '',
        difficultiesEncountered: '',
        aspectsToImprove: ''
      },
      // Agrega más asesorías según sea necesario
    ];
  
    // Llamar a la función countConsultanciesByCourse con el conjunto de asesorías
    const result = component.countConsultanciesByCourse(consultancies);
  
    // Verificar el resultado esperado
    expect(result).toEqual([
      { courseName: 'Course1', consultancies: 2 },
      { courseName: 'Course2', consultancies: 2 },
      { courseName: 'Course3', consultancies: 1 },
      // Agrega más resultados esperados según sea necesario
    ]);
  
    // Verificar si allConsultancyDownloadObj se actualizó correctamente
    expect(component.allConsultancyDownloadObj).toEqual(result);
  });
  it('should count consultancies by course', () => {
    
    // Crear un conjunto de asesorías de ejemplo
    const consultancies: Consultancy[] = [
      {
        academicFriendEmail: 'xx',
        studentCode: '',
        courseName: 'Course1',
        startDate: '',
        endDate: '',
        difficultiesEncountered: '',
        aspectsToImprove: ''
      },
      {
        academicFriendEmail: 'yy',
        studentCode: '',
        courseName: 'Course2',
        startDate: '',
        endDate: '',
        difficultiesEncountered: '',
        aspectsToImprove: ''
      },
      {
        academicFriendEmail: 'xx',
        studentCode: '',
        courseName: 'Course1',
        startDate: '',
        endDate: '',
        difficultiesEncountered: '',
        aspectsToImprove: ''
      },
      {
        academicFriendEmail: 'xx',
        studentCode: '',
        courseName: 'Course3',
        startDate: '',
        endDate: '',
        difficultiesEncountered: '',
        aspectsToImprove: ''
      },
      {
        academicFriendEmail: 'yy',
        studentCode: '',
        courseName: 'Course2',
        startDate: '',
        endDate: '',
        difficultiesEncountered: '',
        aspectsToImprove: ''
      },
      // Agrega más asesorías según sea necesario
    ];
  
    // Llamar a la función countConsultanciesByCourse con el conjunto de asesorías
    const result = component.countConsultanciesByAcademicFriend(consultancies);
  
    // Verificar el resultado esperado
    expect(result).toEqual([
      { academicFriendEmail: 'xx', consultancies: 3 },
      { academicFriendEmail: 'yy', consultancies: 2 },
    ]);
  
    // Verificar si allConsultancyDownloadObj se actualizó correctamente
    expect(component.allConsultancyXAFDownloadObj).toEqual(result);
  });
  it('should getConsultancyBetweenDatesService call countConsultanciesByCourse when findConsultancyBetweenDates return []>0', () => {
    const searchDates = {
      startDate: '2024-01-19T00:00:00',
      endDate: '2024-01-20T00:00:00',
    };
    const consultansyExample = {
      academicFriendEmail: '',
      studentCode: '',
      courseName: '',
      startDate: '',
      endDate: '',
      difficultiesEncountered: '',
      aspectsToImprove: '',
    };
  
    spyOn(component,'countConsultanciesByAcademicFriend').and.returnValue(
      [{ academicFriendEmail: 'Course A', consultancies: 2 },
      { academicFriendEmail: 'Course B', consultancies: 1 },]
    )
    spyOn(consultancyService, 'findConsultancyCourse').and.returnValue(
      of([consultansyExample,consultansyExample,consultansyExample])
    );
  
    component.getConsultanciesByCourseNameService('POO');
  });
  it('should getConsultancyBetweenDatesService call countConsultanciesByCourse when findConsultancyBetweenDates return []>0', () => {
    const searchDates = {
      startDate: '2024-01-19T00:00:00',
      endDate: '2024-01-20T00:00:00',
    };
    const consultansyExample = {
      academicFriendEmail: '',
      studentCode: '',
      courseName: '',
      startDate: '',
      endDate: '',
      difficultiesEncountered: '',
      aspectsToImprove: '',
    };
    spyOn(coreService, 'showMessage')
    spyOn(component,'countConsultanciesByAcademicFriend').and.returnValue(
      [{ academicFriendEmail: 'Course A', consultancies: 2 },
      { academicFriendEmail: 'Course B', consultancies: 1 },]
    )
    spyOn(consultancyService, 'findConsultancyCourse').and.returnValue(
      of([])
    );
  
    component.getConsultanciesByCourseNameService('POO');
    expect(coreService.showMessage).toHaveBeenCalledWith('No se encontró el curso: POO')
  });
  it('should getConsultancyBetweenDatesService call countConsultanciesByCourse when findConsultancyBetweenDates return []>0', () => {
    const searchDates = {
      startDate: '2024-01-19T00:00:00',
      endDate: '2024-01-20T00:00:00',
    };
    const consultansyExample = {
      academicFriendEmail: '',
      studentCode: '',
      courseName: '',
      startDate: '',
      endDate: '',
      difficultiesEncountered: '',
      aspectsToImprove: '',
    };
    spyOn(coreService, 'showMessage')
    spyOn(consultancyService, 'findConsultancyCourse').and.returnValue(
      throwError({error:{message:'ERROR'}})
    );
  
    component.getConsultanciesByCourseNameService('POO');
    expect(coreService.showMessage).toHaveBeenCalledWith('Error al buscar el cursoERROR')
  });
  it('getConsultancyByCourse',()=>{
    spyOn(component,'getConsultanciesByCourseNameService')
    component.getConsultancyByCourse({courseName:'POO'})
    expect(component.getConsultanciesByCourseNameService).toHaveBeenCalledWith('POO')
  })
  it('getConsultancyByAf',()=>{
    spyOn(component,'getConsultancyByAfEmail')
    component.getConsultancyByAf({academicFriendEmail:'af@example.com'})
    expect(component.getConsultancyByAfEmail).toHaveBeenCalledWith('af@example.com')
  })
  it('should call getConsultancyBetweenDatesService with the correct dates', () => {
    // Puedes espiar la función getConsultancyBetweenDatesService
    spyOn(component, 'getConsultancyBetweenDatesService');
  
    // Simular el evento con un objeto que tenga una propiedad semester
    const event = { semester: '2023-1' };
    component.getConsultanciesBySemester(event);
  
    // Verificar si getConsultancyBetweenDatesService se llamó con las fechas correctas
    expect(component.getConsultancyBetweenDatesService).toHaveBeenCalledWith({
      initialDate: '2023-01-01T00:00',
      finalDate: '2023-06-30T00:00',
    });
  });
  it('should getConsultancyBetweenDatesService call countConsultanciesByCourse when findConsultancyBetweenDates return []>0', () => {
    const searchDates = {
      startDate: '2024-01-19T00:00:00',
      endDate: '2024-01-20T00:00:00',
    };
    const consultansyExample = {
      academicFriendEmail: '',
      studentCode: '',
      courseName: '',
      startDate: '',
      endDate: '',
      difficultiesEncountered: '',
      aspectsToImprove: '',
    };
  
    spyOn(component,'countConsultanciesByCourse').and.returnValue(
      [{ courseName: 'Course A', consultancies: 2 },
      { courseName: 'Course B', consultancies: 1 },]
    )
    spyOn(consultancyService, 'getAllConsultancyByEmail').and.returnValue(
      of([consultansyExample,consultansyExample,consultansyExample])
    );
  
    component.getConsultancyByAfEmail('POO');
  });
  it('should getConsultancyBetweenDatesService call countConsultanciesByCourse when findConsultancyBetweenDates return []>0', () => {
    const searchDates = {
      startDate: '2024-01-19T00:00:00',
      endDate: '2024-01-20T00:00:00',
    };
    const consultansyExample = {
      academicFriendEmail: '',
      studentCode: '',
      courseName: '',
      startDate: '',
      endDate: '',
      difficultiesEncountered: '',
      aspectsToImprove: '',
    };
  
    spyOn(component,'countConsultanciesByCourse').and.returnValue(
      [{ courseName: 'Course A', consultancies: 2 },
      { courseName: 'Course B', consultancies: 1 },]
    )
    spyOn(consultancyService, 'getAllConsultancyByEmail').and.returnValue(
      of([])
    );
  
    component.getConsultancyByAfEmail('POO');
  });
  it('should getConsultancyBetweenDatesService call countConsultanciesByCourse when findConsultancyBetweenDates return []>0', () => {
    const searchDates = {
      startDate: '2024-01-19T00:00:00',
      endDate: '2024-01-20T00:00:00',
    };
    const consultansyExample = {
      academicFriendEmail: '',
      studentCode: '',
      courseName: '',
      startDate: '',
      endDate: '',
      difficultiesEncountered: '',
      aspectsToImprove: '',
    };
  
    spyOn(component,'countConsultanciesByCourse').and.returnValue(
      [{ courseName: 'Course A', consultancies: 2 },
      { courseName: 'Course B', consultancies: 1 },]
    )
    spyOn(consultancyService, 'getAllConsultancyByEmail').and.returnValue(
      throwError({error:{message:'error'}})
    );
  
    component.getConsultancyByAfEmail('POO');
  });
  it('should set select options for searchCourseByName field', () => {
    // Crear un array de cursos simulado para el spy
    const mockCourses = [
      { name: 'Course1' },
      { name: 'Course2' },
      // ... agregar más cursos según sea necesario
    ];
  
    // Espiar la función getAllCourses del servicio
    spyOn(courseService, 'getAllCourses').and.returnValue(of(mockCourses));
  
    // Llamar a la función que se está probando
    component.getAllCoursesService();
  
    // Verificar si la función subscribe se llamó y si se asignaron las opciones correctamente
    expect(component.searchCourseByName.fields[0].selectOptions).toEqual([
      { value: 'Course1', label: 'Course1' },
      { value: 'Course2', label: 'Course2' },
      // ... agregar más expectativas según sea necesario
    ]);
  });
});
