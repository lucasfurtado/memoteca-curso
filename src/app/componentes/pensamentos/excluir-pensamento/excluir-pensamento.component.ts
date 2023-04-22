import { Pensamento } from './../pensamento';
import { Component, OnInit } from '@angular/core';
import { PensamentoService } from '../pensamento.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-excluir-pensamento',
  templateUrl: './excluir-pensamento.component.html',
  styleUrls: ['./excluir-pensamento.component.css'],
})
export class ExcluirPensamentoComponent implements OnInit {
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.service.buscaPorId(parseInt(id!)).subscribe((pensamento) => {
      this.pensamento = pensamento;
    });
  }

  constructor(
    private service: PensamentoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  pensamento: Pensamento = {
    id: 0,
    conteudo: '',
    autoria: '',
    modelo: '',
  };

  excluirPensamento(): void{
    if (this.pensamento.id) {
      this.service.excluir(this.pensamento.id).subscribe(() => {
        this.router.navigate(['/listarPensamento']);
      });
    }
    this.redirecionaParaLista();
  }

  cancelar(): void{
    this.redirecionaParaLista();
  }
  
  redirecionaParaLista(): void{
    this.router.navigate(['/listarPensamento']);
  }
}
