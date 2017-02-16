$( function() {
    function DocReservation(name, type, author, date, initialDoc) {
        var self = this;
        self.name = name;
        self.type = type;
        self.author = author;
        self.date = date;
        self.doc = ko.observable(initialDoc);   
    }

    function DocViewModel() {
        var self = this;

        self.documentation = ko.observableArray([
            new DocReservation("Скан-копия паспорта заявителя", "Документы заявителя", "", "", false),
            new DocReservation("Скан-копия ИНН заявителя", "Документы заявителя", "", "", false),
            new DocReservation("Скан-копия заявления", "Документы по заявке", "Сергей Николаев", "15.01.2015", true),
            new DocReservation("Справка о составе семьи", "Документы заявителя", "Юрий Павколас", "11.01.2015", true),
            new DocReservation("Договор залога", "Договоры", "", "", false),
            new DocReservation("Акт оценки залога", "Документы по залогам", "", "", false),
            new DocReservation("Кредитный договор", "Договоры", "", "", false),
            new DocReservation("Справка с места жительства", "Документы заявителя", "", "", false)
        ]);

        self.addDoc = function() {
            $( "#dialog-add" ).dialog( "open" );
            $( "#dialog-add" ).dialog({
                buttons: {
                    "Добавить": function() {
                        var name = $('#dialog-add').find('#name').val();
                        var type = $('#dialog-add').find('#type').val();
                        if(name == ''||type == ''){
                            $('#dialog-add').find('form').append('<span class="error">Необходимо заполнить все поля</span>')
                        }
                        else{
                            self.documentation.push(new DocReservation(name, type, "", "", false));
                            $( this ).dialog( "close" );
                        }                        
                    },
                    "Отмена": function() {
                        $( this ).dialog( "close" );
                    }
                }
            });            
        };
        self.removeDoc = function(doc) {
            self.documentation.remove(doc);
        };
    }

    ko.applyBindings(new DocViewModel());
    
    $("#dialog-add").dialog({
        autoOpen: false,
        resizable: false,
        height: "auto",
        width: 400,
        modal: true,
        create: function() {
            $("#dialog-add").find('input').focus(function(){
                $("#dialog-add").find('.error').remove();
            });
        }
    });
} );