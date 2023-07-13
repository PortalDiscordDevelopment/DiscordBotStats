const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// * Fetch from the repo from the script I wrote.
fetch('https://raw.githubusercontent.com/PortalDiscordDevelopment/MultiBotRunner/main/data/data.json')
    .then((res) => res.json())
    .then((data) => {
        // * Get the div that contains the data tables
        const dataTable = document.getElementById('dataTable');

        // * Generate tables
        generateTable();

        /* * I tried to make the table generate based on the number that was given as input, but I can't seem to get it to work (something for next time).
         * But this function was basically needed to regenerate the table, that's why it's a function while it could also be plain code
         */
        function generateTable(number = 5) {
            // * This retrieves the amount specified latest data updates, defaulted to 5
            function getLatestDate() {
                const latestData = [];
                const timestamps = Object.keys(data).slice(Object.keys(data).length - number, Object.keys(data).length);

                for (let i = 0; i < number; i++) {
                    latestData.push(data[Object.keys(data)[Object.keys(data).length - (i + 1)]]);
                }

                // * It returns both the timestamps and the data as I need to use those values separately.
                return { timestamps, data: latestData };
            }

            // * An object that is used to convert all the timestamped bot values into bot keyed arrays.
            const dataMap = {};

            // * An object used to keep the amount of latest total stats all combined.
            const total = { guilds: [], users: [], shards: [] };

            // * Fill dataMap and total with their needed data.
            getLatestDate().data.map((data) => {
                const totalMap = { guilds: 0, users: 0, shards: 0 };

                Object.entries(data).map(([bot, stats]) => {
                    !dataMap[bot] ? (dataMap[bot] = [stats?.guildCount || -1]) : dataMap[bot].push(stats?.guildCount || -1);

                    totalMap.guilds += stats?.guildCount || 0;
                    totalMap.users += stats?.userCount || 0;
                    totalMap.shards += stats?.shardCount || 0;
                });

                total.guilds.push(totalMap.guilds);
                total.users.push(totalMap.users);
                total.shards.push(totalMap.shards);
            });

            // * The html part for the data tables, I'm not going to explain these...
            dataTable.innerHTML += `<div class="columns">
								<h3>Server counts per bot (last 5)</h3>
								
								<table>
									<tr>
										<th class="thLeft"></th>${getLatestDate()
                                            .timestamps.map(
                                                (data, i) =>
                                                    `<th class="thMid">${datify(new Date(Number(data))).date}<br>${datify(new Date(Number(data))).time}</th><th ${
                                                        i + 1 == number ? 'class="thRight"' : ''
                                                    }></th>`
                                            )
                                            .join('')}
									</tr>
										${Object.entries(dataMap)
                                            .map(
                                                ([bot, guilds]) =>
                                                    `<tr><td class="tdLeft">${bot}</td>${guilds
                                                        .map(
                                                            (a, b) =>
                                                                `<td class="tdMid">${a > 0 ? numbify(a) : ''}</td><td class="${(a - guilds[b - 1] || 0) >= 0 ? 'gain' : 'loss'}">${
                                                                    a - guilds[b - 1] || ''
                                                                }</td>`
                                                        )
                                                        .join('')}</tr>`
                                            )
                                            .join('')}
								</table>
								
								<br>

								<h3>The total stats of every bot combined</h3>
								
								<table>
									<tr>
										<th class="thLeft"></th>${getLatestDate()
                                            .timestamps.map(
                                                (data, i) =>
                                                    `<th class="thMid">${datify(new Date(Number(data))).date}<br>${datify(new Date(Number(data))).time}</th><th ${
                                                        i + 1 == number ? 'class="thRight"' : ''
                                                    }></th>`
                                            )
                                            .join('')}
									</tr>
									<tr><td>Total Servers</td>${total.guilds
                                        .map(
                                            (a, b) =>
                                                `<td class="tdMid">${a == -1 ? '' : numbify(a)}</td><td class="${(a - total.guilds[b - 1] || 0) >= 0 ? 'gain' : 'loss'}">${
                                                    a - total.guilds[b - 1] || ''
                                                }</td>`
                                        )
                                        .join('')}</tr>
									<tr><td>Total Users</td>${total.users
                                        .map(
                                            (a, b) =>
                                                `<td class="tdMid">${a == -1 ? '' : numbify(a)}</td><td class="${(a - total.users[b - 1] || 0) >= 0 ? 'gain' : 'loss'}">${
                                                    a - total.users[b - 1] || ''
                                                }</td>`
                                        )
                                        .join('')}</tr>
									<tr><td>Total Shards</td>${total.shards
                                        .map(
                                            (a, b) =>
                                                `<td class="tdMid">${a == -1 ? '' : numbify(a)}</td><td class="${(a - total.shards[b - 1] || 0) >= 0 ? 'gain' : 'loss'}">${
                                                    a - total.shards[b - 1] || ''
                                                }</td>`
                                        )
                                        .join('')}</tr>
								</table>
							</div>`;
        }

        // All the chart arrays
        const servers = [['Date']],
            users = [['Date']],
            shards = [['Date']],
            growth = [['Date']],
            gain = [['Date']];

        /* * Putting the data in, in a checkers format
						
						[
							['Date', 	 <date>,   <date>,   <date>,   <date>,   <date> ],
							[<botName>, <number>, <number>, <number>, <number>, <number>],
							[<botName>, <number>, <number>, <number>, <number>, <number>],
							[<botName>, <number>, <number>, <number>, <number>, <number>],
							[<botName>, <number>, <number>, <number>, <number>, <number>],
							[<botName>, <number>, <number>, <number>, <number>, <number>],
						]
						
						  * This is then inserted in the google charts package where the magic happens.
						*/
        Object.entries(data).map(([timestamp, v], i) => {
            Object.keys(v).map((bot) => {
                if (!servers.at(0).includes(bot)) servers.at(0).push(bot);
                if (!users.at(0).includes(bot)) users.at(0).push(bot);
                if (!shards.at(0).includes(bot)) shards.at(0).push(bot);
                if (!growth.at(0).includes(bot)) growth.at(0).push(bot);
                if (!gain.at(0).includes(bot)) gain.at(0).push(bot);
            });

            const date = new Date(Number(timestamp));

            servers.push([date, ...Object.values(v).map((i) => i.guildCount)]);
            users.push([date, ...Object.values(v).map((i) => i.userCount)]);
            shards.push([date, ...Object.values(v).map((i) => i.shardCount)]);

            if (date.getMonth() == new Date(Date.now()).getMonth()) {
                growth.push([date, ...Object.values(v).map((i) => i.guildCount)]);

                gain.push([
                    date,
                    ...Object.values(data[Object.keys(data)[i - 1]]).map((p, i) => (isNaN(p.guildCount - Object.values(v)[i].guildCount) ? undefined : p.guildCount - Object.values(v)[i].guildCount)),
                ]);
            }
        });

        google.charts.load('current', { packages: ['corechart'] });
        google.charts.setOnLoadCallback(() => {
            drawChart('Total Servers', `All servers`, servers);
            drawChart('Total Users', `All users`, users);
            drawChart('Total Shards', `All shards`, shards);
            drawChart('Monthly Growth', `This ${months[new Date(Date.now()).getMonth()]}'s growth`, growth);
            drawChart('Monthly Gain', `This ${months[new Date(Date.now()).getMonth()]}'s gain`, gain);
        });

        function drawChart(id, title, table) {
            const data = google.visualization.arrayToDataTable(table);
            const chart = new google.visualization.LineChart(document.getElementById(id.replace(/ +/gim, '')));

            chart.draw(data, {
                title,
                curveType: 'function',
                legend: { position: 'right' },
                selectionMode: 'multiple',
                tooltip: {
                    isHtml: true,
                    trigger: 'selection',
                    showColorCode: true,
                    ignoreBounds: true,
                },
                aggregationTarget: 'auto',
                animation: {
                    startup: true,
                    duration: 3000,
                    easing: 'linear',
                },
                explorer: {
                    actions: ['dragToZoom', 'rightClickToReset'],
                    keepInBounds: true,
                    maxZoomIn: 0,
                },
                enableInteractivity: true,
                focusTarget: 'category',
                theme: {
                    chartArea: { width: '75%', height: '90%' },
                },
            });
        }

        const info = document.getElementById('data-info'),
            date = Object.keys(data),
            since = new Date(Number(date[0])),
            last = new Date(Number(date[date.length - 1]));

        info.innerHTML = `Checking stats since ${datify(since).date},<br>Last updated ${datify(last).full}.`;

        function numbify(number) {
            return number.toLocaleString().replace(/,/gim, ' ');
        }

        function datify(date) {
            return {
                full: `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} at ${date.getHours() < 10 ? '0' : ''}${date.getHours()}:${
                    date.getMinutes() < 10 ? '0' : ''
                }${date.getMinutes()}`,
                time: `${date.getHours() < 10 ? '0' : ''}${date.getHours()}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`,
                date: `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`,
            };
        }
    });
