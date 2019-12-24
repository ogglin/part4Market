import * as tslib_1 from "tslib";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ListenerComponent } from './components/socket/listener/listener.component';
import { ApiComponent } from './components/socket/api/api.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';
import { HomeComponent } from './components/pages/home/home.component';
import { DateIntervalComponent } from './components/date-interval/date-interval.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { MatAutocompleteModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatDatepickerModule, MatDialogModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatOptionModule, MatProgressBarModule, MatSelectModule, MatSidenavModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import { SearchComponent } from './components/search/search.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavCategoryComponent } from './components/nav-category/nav-category.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { UploadDialogComponent } from './components/upload-dialog/upload-dialog.component';
import { UploadComponent } from './components/upload/upload.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductViewComponent } from './components/pages/product-view/product-view.component';
import { ProductAllComponent } from './components/product-all/product-all.component';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { CabinetComponent } from './components/pages/cabinet/cabinet.component';
import { CategoryComponent } from './components/pages/category/category.component';
import { ProductAddFormComponent } from './components/cabinet/product-add-form/product-add-form.component';
import { RegistrationComponent } from './components/auth/registration/registration.component';
import { LoginComponent } from './components/auth/login/login.component';
import { LogoutComponent } from './components/auth/logout/logout.component';
import { AuthComponent } from './components/pages/auth/auth.component';
import { ProfileComponent } from './components/cabinet/profile/profile.component';
import { ClassyComponent } from './components/cabinet/classy/classy.component';
import { SendMailComponent } from './components/send-mail/send-mail.component';
import { CookieService } from 'ngx-cookie-service';
const material = [
    MatDatepickerModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatProgressBarModule,
    MatListModule,
    MatDialogModule,
    MatCardModule
];
const routes = [
    { path: 'product', component: ProductViewComponent },
    { path: 'cabinet', component: CabinetComponent },
    { path: 'auth', component: AuthComponent },
    { path: 'confirm', component: AuthComponent },
    { path: 'category', component: CategoryComponent },
    { path: '', component: HomeComponent },
    { path: '**', component: PageNotFoundComponent }
];
export const options = {};
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            AppComponent,
            ListenerComponent,
            ApiComponent,
            PageNotFoundComponent,
            HomeComponent,
            DateIntervalComponent,
            SearchComponent,
            HeaderComponent,
            FooterComponent,
            NavCategoryComponent,
            SearchResultComponent,
            CarouselComponent,
            UploadDialogComponent,
            UploadComponent,
            ProductCardComponent,
            ProductViewComponent,
            ProductAllComponent,
            TopMenuComponent,
            CabinetComponent,
            CategoryComponent,
            ProductAddFormComponent,
            RegistrationComponent,
            LoginComponent,
            LogoutComponent,
            AuthComponent,
            ProfileComponent,
            ClassyComponent,
            SendMailComponent
        ],
        exports: [UploadComponent],
        entryComponents: [],
        imports: [
            RouterModule.forRoot(routes
            /*, { enableTracing: true } // <-- debugging purposes only*/
            ),
            BrowserModule,
            BrowserAnimationsModule,
            RouterModule,
            ReactiveFormsModule,
            NgxMaskModule.forRoot(options),
            material,
            FlexLayoutModule,
            FormsModule,
            HttpClientModule,
            MatMenuModule,
            MatSidenavModule,
            MatCheckboxModule,
            MatOptionModule,
            MatSelectModule,
            MatAutocompleteModule
        ],
        providers: [CookieService],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map