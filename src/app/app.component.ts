import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { HostListener } from '@angular/core';
import { Http, ResponseContentType } from '@angular/http';
import { ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public backgroundUrl = 'https://media.giphy.com/media/xT39CTrFW4nHLdBPpu/giphy.gif';
  public backgroundTag = 'galaxy';
  public backgroundUpdate = false;

  public foregroundUrl = 'https://media.giphy.com/media/3ohryyinlcU8wV1cCk/giphy.gif';
  public foregroundTag = 'cat';
  public foregroundUpdate = false;

  public displaySettings = false;
  public timer = false;

  private apiKey = 'i5gtF05kbQgYoNPHi5gXPVT2J7ehlfFA';

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.displaySettings = !this.displaySettings;
  }

  constructor(private http: Http) { }

  ngOnInit() {
    setInterval(() => {
      if (this.timer) {
        this.updateBackgroundUrl();
      }

      setTimeout(() => {
        if (this.timer) {
          this.updateForegroundUrl();
        }
      }, 30000);
    }, 60000);
  }

  public toggleTimer() {
    this.timer = !this.timer;
  }

  public updateBackgroundUrl() {
    this.backgroundUpdate = true;

    this.http
      .get('//api.giphy.com/v1/gifs/random', {
        params: {
          'api_key': this.apiKey,
          'tag': this.backgroundTag,
          'rating': 'r'
        },
        responseType: ResponseContentType.Json
      })
      .subscribe(data => {
        this.backgroundUrl = data.json().data.image_url;
        this.backgroundUpdate = false;
      });
  }

  public updateForegroundUrl() {
    this.foregroundUpdate = true;

    this.http
      .get('//api.giphy.com/v1/stickers/random', {
        params: {
          'api_key': this.apiKey,
          'tag': this.foregroundTag,
          'rating': 'r'
        },
        responseType: ResponseContentType.Json
      })
      .subscribe(data => {
        this.foregroundUrl = data.json().data.image_url;
        this.foregroundUpdate = false;
      });
  }
}
