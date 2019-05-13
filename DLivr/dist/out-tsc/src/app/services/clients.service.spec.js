import { TestBed } from '@angular/core/testing';
import { ClientsService } from './clients.service';
describe('ClientsService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(ClientsService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=clients.service.spec.js.map