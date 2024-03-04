import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import { FileService } from 'src/app/services/file.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class CreateArticleComponent implements OnInit {
  article: Article = { codigo: '', descripcion: '', precio: 0, image: '', stock: 0 };
  articleEdit: Article = { codigo: '', descripcion: '', precio: 0, image: '', stock: 0 };
  editing = false;
  imageSrc: string | ArrayBuffer | null | undefined;
  imagen: any;
  imgFile: File | undefined;

  constructor(private router: Router, private route: ActivatedRoute, private articleService: ArticleService, private fileService: FileService) { }

  ngOnInit(): void {
    // Verificar si estamos en modo de edición
    const articleId = this.route.snapshot.paramMap.get('id');
    if (articleId) {
      // Obtener los datos del artículo desde la API y asignarlos a 'article'
      this.editing = true;
      this.articleService.getById(articleId).subscribe((response) => {
        this.article = response;
        this.imageSrc = this.fileService.apiUrlPathImage + this.article.image;
        this.articleEdit = { ...response };
      });
    }
  }

  async submitForm(): Promise<void> {
    if (this.editing) {
      if (this.articleEdit.image != this.imageSrc) {
        const newImage = await this.sendFile();
        this.article.image = `${newImage}`;
      }

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
      this.sendFile().then((fileName: any) => {
        this.article.image = fileName;
        this.articleService.create(this.article).subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'Artículo creado',
            text: 'El artículo se ha creado correctamente',
          }).then(() => {
            this.router.navigate(['/articles-list']); // Redireccionar al listado de artículos
          });
        });
      })
    }
  }

  sendFile() {
    return new Promise((resolve: any) => {
      this.fileService.uploadFile(this.imgFile!).subscribe((response) => {
        console.log(response);
        if (response.success) {
          resolve(response.data);
        }
      })
    })
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0]; // Obtiene el archivo seleccionado

    this.imgFile = file;
    if (file) {
      this.article.image = file.name; // Asigna el nombre del archivo a la propiedad de imagen del artículo

      // Lee el archivo como URL de datos para mostrar una vista previa
      const reader: FileReader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result; // Asigna la URL de datos a la variable de vista previa de imagen
      };
    }
  }
}
