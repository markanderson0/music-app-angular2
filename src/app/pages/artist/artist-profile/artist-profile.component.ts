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

  /**
   * Retrieve the artists name from the route then call the methods
   * required to retrieve data regarding the artists top videos, tickets,
   * merch, albums, and previous shows.
   */
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

  /**
   * Calls the artistProfileService to get swipe options for the carousel
   * and the artists top videos.
   */
  getTopVideos() {
    this.swipeOptions = this.artistProfileService.swipeOptions;
    this.artistProfileService.getVideos()
    .subscribe(videos => {
      this.topVideos = videos;
    });
  }

  /**
   * Calls the ticketsSearchService to get the tickets to display on the
   * artist profile page and to get a boolean to indicate whether the artist
   * has any tickets available.
   * 
   * @param artistName: the name of the artist
   */
  getArtistTickets(artistName) {
    this.ticketsSearchService.simpleSearchEvents(artistName)
    .subscribe(tickets => {
      this.tickets = this.ticketsSearchService.displayTickets;
      this.hasTickets =  this.ticketsSearchService.hasTickets;
    });
  }

  /**
   * Calls the merchListService to get the merch to display on the
   * artist profile page and to get a boolean to indicate whether the artist
   * has any merch available.
   * 
   * @param artistName: the name of the artist
   */
  getArtistMerch(artistName) {
    this.merchListService.getMerch(artistName + ' shirt', '11450', 1, 'Best Match', [])
    .then(merch => {
      this.merch = this.merchListService.displayMerch;
      this.hasMerch = this.merchListService.hasMerch;
    });
  }


  /**
   * Calls the artistAlbumsService to get the albums to display on the
   * artist profile page and to get a boolean to indicate whether the artist
   * has any albums.
   * 
   * @param artistName: the name of the artist
   */
  getArtistAlbums(artistName) {
    this.artistAlbumsService.getArtistId(this.artistName)
    .subscribe(artistId => {
      this.artistAlbumsService.getArtistAlbums(artistId)
      .subscribe(artistAlbums => {
        this.displayAlbums = this.artistAlbumsService.displayAlbums;
        this.hasAlbums = this.artistAlbumsService.hasAlbums;
      });
    });
  }

  /**
   * Calls the artistShowsService to get the artists name according to the
   * Spotify search api, then this name is used to get the artists 
   * MusicBrainz Id (MBID). If the artist has an MBID then call the getArtistShows
   * method to get the previous shows to display, otherwise set the hasShows boolean
   * to false since an MBID is required to get an artists previous shows.
   * 
   * @param artistName: the name of the artist
   */
  getArtistPreviousShows(artistName) {
    this.artistShowsService.getName(artistName)
    .subscribe(name => {
      this.artistShowsService.getArtist(name.toString())
      .subscribe(artistMBID => {
        if (artistMBID !== undefined) {
          this.getArtistShows(artistMBID);
        } else {
          this.hasShows = false;
        }
      });
    });
  }

  /**
   * Calls the artistShowsService to get the previous shows to display on the
   * artist profile page and to get a boolean to indicate whether the artist
   * has any previous shows.
   * 
   * @param artistMBID: an artists MusicBrainz Id
   */
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
