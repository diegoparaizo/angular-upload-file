import { NgModule } from "@angular/core";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
    exports: [
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatProgressBarModule,
        MatListModule,
        MatToolbarModule, 
        MatButtonModule, 
        MatIconModule
    ]
})

export class MaterialModule {}