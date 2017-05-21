/**
 * Created by Wajid Khilji on 17/05/2017.
 */
import { Component, OnInit  } from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';
declare var $:any;
import { AuthenticationService} from '../../_services/authentication.service';
import {SidebarComponent} from '../../sidebar/sidebar.component';
import {User} from "../../_modals/user";

@Component({
    selector: 'login-cmp',
    moduleId: module.id,
    templateUrl: 'login-register.component.html',
    styleUrls: ['login-register.css']
})

export class LoginRegisterComponent implements OnInit{
    public isLogin: true;
    public user: User;
    public returnUrl: string;
    public errorMessage ="";

    public retypePassword ="";
    constructor(
        public authService: AuthenticationService,
        private route: ActivatedRoute,
        private router: Router,
    ){

    }
    ngOnInit(){
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.user = new User();
        this.user.Password = '';
        this.user.LastName = '';
        this.user.Email = '';
        this.user.FirstName = '';

    }

    login(model: any, isValid: boolean){

        if(isValid) {


            this.authService.login(model.loginEmail, model.loginPassword).subscribe(() => {
                $('#loginModal').modal('hide');
                this.router.navigate([this.returnUrl]);
            }, (error)=> {
                this.errorMessage = error.statusText + ": check email or password";
            });
        }
    }

    register(model: User, isValid: boolean){
        console.log(model, isValid);
        if(isValid) {

            this.authService.register(model).subscribe(() => {
                $('#loginModal').modal('hide');
                this.router.navigate([this.returnUrl]);
            })
        }
    }

    shakeModal(){
        $('#loginModal .modal-dialog').addClass('shake');
        $('.error').addClass('alert alert-danger').html("Invalid email/password combination");
        $('input[type="password"]').val('');
        setTimeout( function(){
            $('#loginModal .modal-dialog').removeClass('shake');
        }, 1000 );
    }

    showRegisterForm(){
    $('.loginBox').fadeOut('fast',function(){
        $('.registerBox').fadeIn('fast');
        $('.login-footer').fadeOut('fast',function(){
            $('.register-footer').fadeIn('fast');
        });
        $('.modal-title').html('Register with');
    });
    $('.error').removeClass('alert alert-danger').html('');

}
    showLoginForm(){
    $('#loginModal .registerBox').fadeOut('fast',function(){
        $('.loginBox').fadeIn('fast');
        $('.register-footer').fadeOut('fast',function(){
            $('.login-footer').fadeIn('fast');
        });

        $('.modal-title').html('Login with');
    });
    $('.error').removeClass('alert alert-danger').html('');
}

    openLoginModal(){
    this.showLoginForm();
    setTimeout(function(){
        $('.modal').appendTo("body");
        $('#loginModal').modal('show');
    }, 230);

}
    openRegisterModal(){
    this.showRegisterForm();
    setTimeout(function(){
        $('.modal').appendTo("body");
        $('#loginModal').modal('show');
    }, 230);

    }
}
