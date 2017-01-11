# :koala: botmonkey
A chatbot for medical health record surveys using [koa-starter] (https://github.com/snollygolly/koa-starter) starter kit.

### Installation

* Clone down the repository.
```
git clone https://github.com/2rod/botmonkey.git
```

* Install packages (from inside the botmonkey folder).
```
npm install
```

* Create your config.  There's a `config.json.example` file in the root.  Edit it to include all your values for the site and your OAuth information.  Save it as `config.json` and leave it in the root.

* If you want to use Google Analytics, set `config.site.analytics` to your Tracking ID and make sure the analytics partial (analytics.hbs) contains the correct Universal Analytics tracking code.  If you don't want to use Google Analytics, remove that property or set it to false.

* Start it up.
```
npm start
```

* Enjoy!
