import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkersByProjectComponent } from './workers-by-project.component';

describe('WorkersByProjectComponent', () => {
  let component: WorkersByProjectComponent;
  let fixture: ComponentFixture<WorkersByProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkersByProjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkersByProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
