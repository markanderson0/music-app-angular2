import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TicketsSearchService } from '../../tickets/tickets-search/tickets-search.service';
import { MerchListService } from '../../merch/merch-list/merch-list.service';
import { ArtistAlbumsService } from '../../artist/artist-albums/artist-albums.service';
import { ArtistShowsService } from '../../artist/artist-shows/artist-shows.service';
import { VideoTabsService } from './video-tabs.service';

@Component({
  selector: 'video-tabs',
  templateUrl: 'video-tabs.component.html',
  styleUrls: [
    './video-tabs.component.scss',
    '../../artist/artist-profile/artist-profile.component.scss',
    '../../tickets/tickets-search/tickets-search.component.scss'
  ],
  providers: [TicketsSearchService, MerchListService, ArtistAlbumsService, ArtistShowsService, VideoTabsService]
})
export class VideoTabsComponent implements OnInit {

  artistName: string;
  showVideos: any[];
  artistAlbums: any[];
  tickets: any[];
  merch: any[];
  artistShows: any[];
  artistMBID: string;

  hasVideos: boolean = true;
  hasTickets: boolean;
  hasMerch: boolean;
  hasShows: boolean;
  hasAlbums: boolean;
  swipeOptions: any;

  loadedVideos: boolean = false;
  loadedTickets: boolean = false;
  loadedMerch: boolean = false;
  loadedAlbums: boolean = false;
  loadedShows: boolean = false;

  playlistId: string;
  showId: string;
  videoId: string;

  pageNum: number = 1;
  maxSize: number = 10;
  currentPage: number = 1;
  totalItems: number;
  itemsPerPage: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ticketsSearchService: TicketsSearchService,
    private merchListService: MerchListService,
    private artistAlbumsService: ArtistAlbumsService,
    private artistShowsService: ArtistShowsService,
    private videoTabsService: VideoTabsService
  ) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.artistName = params['artist'];
      this.playlistId = params['playlist'];
      this.showId = params['show'];
      this.videoId = params['id'];
      this.getShowVideos();
    });
  }

  getShowVideos() {
    if (!this.loadedVideos) {
      this.loadedVideos = true;
      this.swipeOptions = this.videoTabsService.swipeOptions;
      this.videoTabsService.getVideos(this.showId, this.artistName)
      .subscribe(videos => {
        this.showVideos = videos[0].videos;
      });
    }
  }

  getArtistTickets() {
    if (!this.loadedTickets) {
      this.loadedTickets = true;
      this.ticketsSearchService.simpleSearchEvents(this.artistName)
      .subscribe(tickets => {
        this.tickets = tickets;
        this.hasTickets =  this.ticketsSearchService.hasTickets;
      });
    }
  }

  getArtistMerch() {
    if (!this.loadedMerch) {
      this.loadedMerch = true;
      this.merchListService.getMerch(this.artistName + ' shirt', '11450', 1, 'Best Match', [])
      .then(merch => {
        if (merch.length > 12) {
          this.merch = merch.slice(0, 12);
        }
        else {
          this.merch = merch;
        }
        this.hasMerch = this.merchListService.hasMerch;
      });
    }
  }


  getArtistAlbums() {
    if (!this.loadedAlbums) {
      this.loadedAlbums = true;
      this.artistAlbumsService.getArtistPicture(this.artistName)
      .subscribe(picAndId => {
        let artistId = picAndId[0].id;
        this.artistAlbumsService.getArtistAlbums(artistId)
        .subscribe(artistAlbums => {
          this.artistAlbums = artistAlbums;
          this.hasAlbums = this.artistAlbumsService.hasAlbums;
        });
      });
    }
  }

  getArtistPreviousShows() {
    if (!this.loadedShows) {
      this.loadedShows = true;
      this.artistShowsService.getName(this.artistName)
      .subscribe(name => {
        this.artistShowsService.getArtist(name.toString())
        .subscribe(artistMBID => {
          if (artistMBID !== undefined) {
            this.artistMBID = artistMBID.toString();
            this.getArtistShows();
          }
          else {
            this.hasShows = false;
          }
        });
      });
    }
  }

  getArtistShows() {
    this.artistShows = [];
    this.artistShowsService.getArtistShows(this.artistMBID, this.pageNum)
    .subscribe(shows => {
      this.artistShows = shows;
      this.hasShows = this.artistShowsService.hasShows;
      this.totalItems = this.artistShowsService.totalPages / 2;
      this.itemsPerPage = this.artistShowsService.itemsPerPage;
    });
  }

  pageChanged(event: any): void {
    this.pageNum = event.page;
    this.getArtistShows();
  }

  openVideo(playlistId, videoId) {
    this.router.navigate(['video', this.artistName, this.showId, playlistId, videoId]);
  }

  openVideos() {
    this.router.navigate(['artist/' + this.artistName + '/videos']);
  }

  openTickets() {
    this.router.navigate(['tickets/artist', this.artistName]);
  }

  openMerch() {
    this.router.navigate(['merch/search', { query: this.artistName }]);
  }

  openShows() {
    this.router.navigate(['artist/' + this.artistName + '/shows']);
  }

  openAlbums() {
    this.router.navigate(['artist/' + this.artistName + '/albums']);
  }

  openLink(url) {
    window.open(url);
  }
}
