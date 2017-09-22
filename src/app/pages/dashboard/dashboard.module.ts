import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';

import { Dashboard } from './dashboard.component';
import { routing }       from './dashboard.routing';

import { PopularApp } from '../../theme/pages/dashboard/popularApp';
import { PieChart } from './pieChart';
import { TrafficChart } from '../../theme/pages/dashboard/trafficChart';
import { UsersMap } from '../../theme/pages/dashboard/usersMap';
import { LineChart } from '../../theme/pages/dashboard/lineChart';
import { Feed } from '../../theme/pages/dashboard/feed';
import { Todo } from '../../theme/pages/dashboard/todo';
import { Calendar } from '../../theme/pages/dashboard/calendar';
import { CalendarService } from '../../theme/pages/dashboard/calendar/calendar.service';
import { FeedService } from '../../theme/pages/dashboard/feed/feed.service';
import { LineChartService } from '../../theme/pages/dashboard/lineChart/lineChart.service';
import { PieChartService } from './pieChart/pieChart.service';
import { TodoService } from '../../theme/pages/dashboard/todo/todo.service';
import { TrafficChartService } from '../../theme/pages/dashboard/trafficChart/trafficChart.service';
import { UsersMapService } from '../../theme/pages/dashboard/usersMap/usersMap.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    NgaModule,
    routing
  ],
  declarations: [
    PopularApp,
    PieChart,
    TrafficChart,
    UsersMap,
    LineChart,
    Feed,
    Todo,
    Calendar,
    Dashboard
  ],
  providers: [
    CalendarService,
    FeedService,
    LineChartService,
    PieChartService,
    TodoService,
    TrafficChartService,
    UsersMapService
  ]
})
export class DashboardModule {}
