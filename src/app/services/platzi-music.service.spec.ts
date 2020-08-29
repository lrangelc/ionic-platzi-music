import { TestBed } from '@angular/core/testing';

import { PlatziMusicService } from './platzi-music.service';

describe('PlatziMusicService', () => {
  let service: PlatziMusicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlatziMusicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
