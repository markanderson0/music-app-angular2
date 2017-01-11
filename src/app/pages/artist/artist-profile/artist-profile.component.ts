import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TicketsSearchService } from '../../tickets/tickets-search/tickets-search.service';
import { MerchListService } from '../../merch/merch-list/merch-list.service';
import { ArtistAlbumsService } from '../artist-albums/artist-albums.service';
import { ArtistShowsService } from '../artist-shows/artist-shows.service';
import { ArtistProfileService } from './artist-profile.service';

@Component({
  selector: 'artist-profile',
  templateUrl: 'artist-profile.component.html',
  styleUrls: ['./artist-profile.component.scss'],
  providers: [TicketsSearchService, MerchListService, ArtistAlbumsService, ArtistShowsService, ArtistProfileService]
})
export class ArtistProfileComponent implements OnInit {

  artistName: string;
  topVideos: any[];
  displayAlbums: any[];
  tickets: any[];
  merch: any[];
  displayShows: any[];

  hasVideos: boolean = true;
  hasTickets: boolean;
  hasMerch: boolean;
  hasShows: boolean;
  hasAlbums: boolean;
  swipeOptions: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ticketsSearchService: TicketsSearchService,
    private merchListService: MerchListService,
    private artistAlbumsService: ArtistAlbumsService,
    private artistShowsService: ArtistShowsService,
    private artistProfileService: ArtistProfileService
  ) { }

  ngOnInit() {
    this.route.parent.params.forEach((params: Params) => {
      this.artistName = params['artist'];
      this.getTopVideos();
      this.getArtistTickets(this.artistName);
      this.getArtistMerch(this.artistName);
      this.getArtistAlbums(this.artistName);
      this.getArtistPreviousShows(this.artistName);
    });
  }

  getTopVideos() {
    this.swipeOptions = this.artistProfileService.swipeOptions;
    this.artistProfileService.getVideos()
    .subscribe(videos => {
      this.topVideos = videos;
    });
  }

  getArtistTickets(artistName) {
    this.ticketsSearchService.simpleSearchEvents(artistName)
    .subscribe(tickets => {
      this.tickets = this.ticketsSearchService.displayTickets;
      this.hasTickets =  this.ticketsSearchService.hasTickets;
    });
  }

  getArtistMerch(artistName) {
    this.merchListService.getMerch(artistName + ' shirt', '11450', 1, 'Best Match', [])
    .then(merch => {
      this.merch = this.merchListService.displayMerch;
      this.hasMerch = this.merchListService.hasMerch;
    });
  }


  getArtistAlbums(artistName) {
    this.artistAlbumsService.getArtistPicture(this.artistName)
    .subscribe(picAndId => {
      let artistId = picAndId[0].id;
      this.artistAlbumsService.getArtistAlbums(artistId)
      .subscribe(artistAlbums => {
        this.displayAlbums = this.artistAlbumsService.displayAlbums;
        this.hasAlbums = this.artistAlbumsService.hasAlbums;
      });
    });
  }

  getArtistPreviousShows(artistName) {
    this.artistShowsService.getName(artistName)
    .subscribe(name => {
      this.artistShowsService.getArtist(name.toString())
      .subscribe(artistMBID => {
        if (artistMBID !== undefined) {
          this.getArtistShows(artistMBID);
        }
        else {
          this.hasShows = false;
        }
      });
    });
  }

  getArtistShows(artistMBID) {
    this.displayShows = [];
    this.artistShowsService.getArtistShows(artistMBID, '1')
    .subscribe(shows => {
      this.displayShows = this.artistShowsService.displayShows;
      this.hasShows = this.artistShowsService.hasShows;
    });
  }

  openVideo(showId, playlistId, videoId) {
    this.router.navigate(['video/', this.artistName, showId, playlistId, videoId]);
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
