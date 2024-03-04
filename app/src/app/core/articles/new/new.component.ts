import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class CreateArticleComponent implements OnInit {
  article: Article = { codigo: '', descripcion: '', precio: 0, image: '', stock: 0 };
  editing = false;

  constructor(private router: Router, private route: ActivatedRoute, private articleService: ArticleService) { }

  ngOnInit(): void {
    // Verificar si estamos en modo de edición
    const articleId = this.route.snapshot.paramMap.get('id');
    if (articleId) {
      // Obtener los datos del artículo desde la API y asignarlos a 'article'
      this.editing = true;
      this.articleService.getById(articleId).subscribe((response) => {
        this.article = response;
      });
    }
  }

  submitForm(): void {
    if (this.editing) {
      // Lógica para guardar los cambios del artículo en la base de datos
      this.articleService.update(this.article).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Artículo actualizado',
          text: 'El artículo se ha actualizado correctamente',
        }).then(() => {
          this.router.navigate(['/articles-list']); // Redireccionar al listado de artículos
        });
      });
    } else {
      // Lógica para crear un nuevo artículo en la base de datos
      this.articleService.create(this.article).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Artículo creado',
          text: 'El artículo se ha creado correctamente',
        }).then(() => {
          this.router.navigate(['/articles-list']); // Redireccionar al listado de artículos
        });
      });
    }
  }
}
