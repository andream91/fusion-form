class MenuListController {

    /** Costruttore
     * 
     * @param $log
     */
    constructor($log, $http) {
        var self = this

        self.$log = $log;
        self.menuItems = {};
        self.selected = null;

        $http.get('src/menu/config/fusion_finder.config.json')
            .then(

            function (response) {
                console.log("Loaded menuList configuration file");
                self.menuItems = response.data;

                console.log(self.menuItems);

            },

            function (error) {
                console.log("Some error occurred");
            }

            );


        self.selectItem = function (item) {
            self.selected = item.name;

            console.log(self.selected + ' clicked!');
        }
    }

}

export default MenuListController;