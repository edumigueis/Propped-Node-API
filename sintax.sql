create table User_Propped(
	id_user int identity primary key not null,
	code_user varchar(100) not null,
	name_user varchar(50) not null,
	email_user varchar(320) not null,
	pass_user varchar(max) not null,
	gender_user varchar(30) not null,
	birth_date_user date not null,
	registry_user varchar(30) not null,
	phone_user varchar(30) not null,
	image_user varchar(500),
	preference_user varchar(30) not null
)

create table Store_Propped(
	id_store int identity primary key not null,
	code_store varchar(100) not null,
	name_store varchar(50) not null,
	registry_store varchar(30) not null,
	website_store varchar(100) not null,
	phone_store varchar(30) not null,
	postal_code_store varchar(30) not null,
	address_store varchar(200) not null,
	city_store varchar(60) not null,
	state_store varchar(60) not null,
	country_store varchar(60) not null,
	image_store varchar(500) not null
)

create table FormofPayment_Propped(
	id_formofpayment int identity primary key not null,
	code_formofpayment varchar(100) not null,
	name_formofpayment varchar(30) not null,
	time_formofpayment int not null
)

create table Favorite_Propped(
	id_favorite int identity primary key not null,
	code_favorite varchar(100) not null,
	id_user_favorite int not null,
	id_product_favorite int not null,
	constraint fkUser_Favorites_Propped foreign key (id_user_favorite) references User_Propped(id_user),
	constraint fkProduct_Favorites_Propped foreign key (id_product_favorite) references Product_Propped(id_product)
)

create table Category_Propped(
	id_category int identity primary key not null,
	code_category varchar(100) not null,
	name_category varchar(50) not null
)

create table Subcategory_Propped(
	id_subcategory int identity primary key not null,
	code_subcategory varchar(100) not null,
	id_category_subcategory int not null,
	name_subcategory varchar(50) not null,
	constraint fkCategory_Subcategory_Propped foreign key (id_category_subcategory) references Category_Propped(id_category)
)

create table ProductAttribute_Propped(
	id_productattribute int identity primary key not null,
	code_productattribute varchar(100) not null,
	id_attribute_productattribute int not null,
	id_product_productattribute int not null,
	value_productattribute varchar(100) not null,
	available_productattribute bit not null,
	constraint fkAttibute_ProductAttribute_Propped foreign key (id_attribute_productattribute) references Attribute_Propped(id_attribute),
	constraint fkProduct_ProductAttribute_Propped foreign key (id_product_productattribute) references Product_Propped(id_product)
)

create table Attribute_Propped(
	id_attribute int identity primary key not null,
	code_attribute varchar(100) not null,
	name_attribute varchar(50)
)

create table Order_Propped(
	id_order int identity primary key not null,
	code_order varchar(100) not null,
	id_user_order int not null,
	id_form_of_payment_order int not null,
	date_order datetime not null,
	total_order money not null,
	total_of_shipping_order money not null,
	constraint fkUser_Order_Propped foreign key (id_user_order) references User_Propped(id_user),
	constraint fkFormofPayment_Order_Propped foreign key (id_form_of_payment_order) references FormofPayment_Propped(id_formofpayment)
)

create table Sale_Propped(
	id_sale int identity primary key not null,
	code_sale varchar(100) not null,
	id_store_sale int not null,
	delivery_time_sale int not null,
	amount_sale money not null,
	shipping_sale money not null,
	date_order datetime not null,
	constraint fkStore_Order_Propped foreign key (id_store_sale) references Store_Propped(id_store)
)


create table SalesOrder_Propped(
	id_salesorder int identity primary key not null,
	code_salesorder varchar(100) not null,
	id_sale_salesorder int not null,
	id_order_salesorder int not null,
	constraint fkSale_SalesOrder_Propped foreign key (id_sale_salesorder) references Sale_Propped(id_sale),
	constraint fkOrder_SalesOrder_Propped foreign key (id_order_salesorder) references Order_Propped(id_order)
)

create table ProductsSale_Propped(
	id_productssale int identity primary key not null,
	code_productssale varchar(100) not null,
	id_product_productssale int not null,
	id_sale_productssale int not null,
	amount_productssale int not null,
	constraint fkProduct_ProductsSale_Propped foreign key (id_product_productssale) references Product_Propped(id_product),
	constraint fkSale_ProductsSale_Propped foreign key (id_sale_productssale) references Sale_Propped(id_sale)
)

create table Product_Propped(
	id_product int identity primary key not null,
	code_product varchar(100) not null,
	id_store_product int not null,
	id_category_product int not null,
	id_subcategory_product int not null,
	name_product varchar(50) not null,
	description_product varchar(1000) not null,
	weight_product money not null,
	price_product money not null,
	stock_product int not null,
	constraint fkStore_Product_Propped foreign key (id_store_product) references Store_Propped(id_store),
	constraint fkCategory_Product_Propped foreign key (id_category_product) references Category_Propped(id_category),
	constraint fkSubcategory_Product_Propped foreign key (id_subcategory_product) references Subcategory_Propped(id_subcategory)
)

create table ProductsShoppingCart_Propped(
	id_productsshoppingcart int identity primary key not null,
	code_productsshoppingcart varchar(100) not null,
	id_product_productsshoppingcart int not null,
	id_shoppingcart_productsshoppingcart int not null,
	amount_productsshoppingcart int not null,
	constraint fkProduct_ProductsShoppingCart_Propped foreign key (id_product_productsshoppingcart) references Product_Propped(id_product),
	constraint fkShoppingCart_ProductsShoppingCart_Propped foreign key (id_shoppingcart_productsshoppingcart ) references ShoppingCart_Propped(id_shoppingcart)
)

create table ShoppingCart_Propped(
	id_shoppingcart int identity primary key not null,
	code_shoppingcart varchar(100) not null,
	id_user_shoppingcart int not null,
	constraint fkUser_ShoppingCart_Propped foreign key (id_user_shoppingcart) references User_Propped(id_user)
)

create table Image_Propped(
	id_image int identity primary key not null,
	code_image varchar(100) not null,
	photo_image varchar(500) not null
)

create table ImagesProduct_Propped(
	id_imagesproduct int identity primary key not null,
	code_imagesproduct varchar(100) not null,
	id_image_imagesproduct int not null,
	id_product_imagesproduct int not null,
	constraint fkImage_ImagesProduct_Propped foreign key (id_image_imagesproduct) references Image_Propped(id_image),
	constraint fkProduct_ImagesProduct_Propped foreign key (id_product_imagesproduct) references Product_Propped(id_product)
)

create table Rating_Propped(
	id_rating int identity primary key not null,
	code_rating varchar(100) not null,
	stars_rating tinyint not null
)

create table UsersRating_Propped(
	id_usersrating int identity primary key not null,
	code_usersrating varchar(100) not null,
	id_rating_usersrating int not null,
	id_user_usersrating int not null,
	id_store_usersrating int not null,
	constraint fkRating_UsersRating_Propped foreign key (id_rating_usersrating) references Rating_Propped(id_rating),
	constraint fkUser_UsersRating_Propped foreign key (id_user_usersrating) references User_Propped(id_user),
	constraint fkStore_UsersRating_Propped foreign key (id_store_usersrating) references Store_Propped(id_store)
)

