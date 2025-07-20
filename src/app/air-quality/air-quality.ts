import { Component, inject } from '@angular/core';
import { IpService } from '../services/ip.service';
import { HttpClient } from '@angular/common/http';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-air-quality',
  imports: [NgClass],
  templateUrl: './air-quality.html',
  styleUrl: './air-quality.css',
})
export class AirQuality {
  private ipService = inject(IpService);
  private httpClient = inject(HttpClient);
  myIP: string = '';
  aqiObj: any = {
    code: '0',
    msg: '',
    data: {
      city: '',
      aqi: '',
      co: '',
      no2: '',
      o3: '',
      pm10: '',
      pm25: '',
      so2: '',
      geo: {
        lat: '',
        lon: '',
      },
    },
  };

  constructor() {
    this.ipService.getPublicIp().subscribe((data) => {
      this.myIP = data.ip;
      this.getAirQualityIndex(data.ip);
      this.getAqiCategory();
    });
  }

  getAirQualityIndex(myIP: any) {
    let requestURL =
      'https://hub.juheapi.com/aqi/v1/ip?apikey=434306d581f376e3aa290e7c7df966fc&ip=' +
      myIP;
    this.httpClient.get(requestURL).subscribe((result: any) => {
      this.aqiObj = result;
    });
  }

  getAqiCategory(): string {
    const aqi = this.aqiObj?.data?.aqi ? this.aqiObj?.data?.aqi : 17;
    if (aqi <= 50) return 'good';
    if (aqi <= 100) return 'moderate';
    if (aqi <= 150) return 'unhealthy-sensitive';
    if (aqi <= 200) return 'unhealthy';
    if (aqi <= 300) return 'very-unhealthy';
    return 'hazardous';
  }

   getCategoryLabel(): string {
    const categories: any = {
      good: 'Good',
      moderate: 'Moderate',
      'unhealthy-sensitive': 'Unhealthy for Sensitive Groups',
      unhealthy: 'Unhealthy',
      'very-unhealthy': 'Very Unhealthy',
      hazardous: 'Hazardous'
    };
    return categories[this.getAqiCategory()];
  }
}
