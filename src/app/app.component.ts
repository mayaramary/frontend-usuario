import { Component, OnInit } from '@angular/core';
import { UsuarioServiceService } from './usuario-service.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [MessageService],
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'projeto_embras';
  usuarios: any = [];
  nome: string = '';
  email: string = '';

  constructor(private messageService: MessageService,
    private usuariosService: UsuarioServiceService) { }

  ngOnInit(): void {
    this.selectUsuarios();
  }
  selectUsuarios () {
    this.usuariosService.getDados().subscribe(
      (response) => {
        this.usuarios = response;
      },
      (error) => {
        console.error('Erro ao obter dados:', error);
      }
    );
  }
  deleteUsuario (id : number) {
    this.usuariosService.deleteDados(id).subscribe(
      (response) => {
        this.showSuccess('O usuário foi excluido!');
        this.selectUsuarios();
      },
      (error) => {
        console.error('Erro ao excluir usuário', error);
      }
    );
  }
  showSuccess(mensagem : string) {
    return this.messageService.add({severity: 'success', summary: 'Sucesso', detail: mensagem});
  }
  insereUsuario (nome : any, email : any) {
    this.usuariosService.insereDados(nome,email).subscribe(
      (response) => {
        this.showSuccess('O usuário foi inserido com sucesso!');
        this.selectUsuarios();
      },
      (error) => {
        console.error('Erro ao inserir usuário', error);
      }
    );
  }

  visible: boolean = false;

    showDialog() {
        this.visible = true;
    }

    enviar(){
      this.insereUsuario(this.nome, this.email);
      this.nome = '';
      this.email = '';
      this.visible = false;
    }
    cancelar(){
      this.nome = '';
      this.email = '';
      this.visible = false;
    }




}



