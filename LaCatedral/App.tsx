/**
 * La Catedral Airsoft - Aplicativo
 *
 * Desenvolvido por: Ielris Marques
 * Finalidade: Projeto Acadêmico (com possibilidade de expansão)
 * Empresa Parceira: La Catedral Airsoft (CNPJ: 42.619.235/0001-06)
 * Data de Criação: 07/02/2025
 * Última Atualização: 26/03/2025
 *
 * Descrição:
 * Aplicativo React Native para loja virtual de produtos de airsoft,
 * incluindo:
 * - Catálogo de produtos com filtros por categoria
 * - Carrinho de compras integrado com WhatsApp
 * - Informações sobre campos de jogo
 * - Página de contato com localização e redes sociais
 *
 * Tecnologias Utilizadas:
 * - React Native
 * - Expo (Expo Image, Expo AV)
 * - React Native Vector Icons (MaterialIcons, FontAwesome)
 * - React Native Linking (integração com WhatsApp)
 * - React Native Modal (para carrinho e detalhes de produtos)
 *
 * Funcionalidades Principais:
 * - Visualização em grade de produtos
 * - Expansão de itens para detalhes completos
 * - Adição/remoção de itens do carrinho
 * - Finalização de compra via WhatsApp
 * - Navegação entre seções (Loja, Campos, Contato)
 * - Player de vídeo integrado para os campos
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, FlatList, Modal, Pressable, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { Video } from 'expo-av';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

export default function App() {
    const [showSplash, setShowSplash] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentScreen, setCurrentScreen] = useState('loja');
    const [cartItems, setCartItems] = useState([]);
    const [isCartVisible, setIsCartVisible] = useState(false);
    const [expandedProduct, setExpandedProduct] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("Todos");

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSplash(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const navigateTo = (page) => {
        setIsMenuOpen(false);
        setCurrentScreen(page);
    };

    const addToCart = (product) => {
        setCartItems(prevItems => [...prevItems, product]);
    };

    const removeFromCart = (index) => {
        setCartItems(prevItems => prevItems.filter((_, i) => i !== index));
    };

    const completePurchase = () => {
        let message;
        if (cartItems.length === 1) {
            message = `Olá, La Catedral! Gostaria de comprar o seguinte item: ${cartItems[0].name}`;
        } else {
            const itemsList = cartItems.map(item => item.name).join(', ');
            message = `Olá, La Catedral! Gostaria de comprar os seguintes itens: ${itemsList}`;
        }

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://api.whatsapp.com/send?phone=5531998331464&text=${encodedMessage}`;
        Linking.openURL(whatsappUrl).catch(() => {
            alert('Não foi possível abrir o WhatsApp');
        });

        setIsCartVisible(false);
        setCartItems([]);
    };

    const openProductDetails = (product) => {
        setExpandedProduct(product);
    };

    const closeProductDetails = () => {
        setExpandedProduct(null);
    };

    const openWhatsApp = (productName) => {
        const message = `Olá, La Catedral! Eu gostaria de comprar o item: ${productName}`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://api.whatsapp.com/send?phone=5531998331464&text=${encodedMessage}`;
        Linking.openURL(whatsappUrl).catch(() => {
            alert('Não foi possível abrir o WhatsApp');
        });
    };

    {/* Alguns dos produtos da empresa (listei somente 2 de cada tipo, pois eles tem muitos kkk) */}
    const products = [
        {
            id: 1,
            name: "Pistola Silver Black",
            brand: "ROSSI",
            price: 1199,
            description: "Pistola GBB estilo 1911, metal full size com carregador",
            image: "https://lacatedralairsoft.com/img-l/1911_SILVERBLACK_ROSSI.jpg",
            category: "Pistolas"
        },
        {
            id: 2,
            name: "Pistola Glock V17",
            brand: "ROSSI",
            price: 949,
            description: "Pistola GBB estilo Glock G17, metal full size com carregador",
            image: "https://lacatedralairsoft.com/img-l/GLOCK_V17_ROSSI.jpg",
            category: "Pistolas"
        },
        {
            id: 3,
            name: "Rifle 416L ROSSI",
            brand: "ROSSI",
            price: 2549,
            description: "Rifle AEG com corpo em metal e coronha em borracha",
            image: "https://lacatedralairsoft.com/img-l/NEPTUNE_416L_ROSSI.jpg",
            category: "Rifles"
        },
        {
            id: 4,
            name: "Rifle AR15 Sentinel 10",
            brand: "ROSSI",
            price: 1649,
            description: "Rifle AEG com corpo em metal e polímero na cor TAN",
            image: "https://lacatedralairsoft.com/img-l/ROSSI_AR15_SENTINEL_10_TAN.jpg",
            category: "Rifles"
        },
        {
            id: 5,
            name: "Sniper M40",
            brand: "ROSSI",
            price: 1799,
            description: "Sniper de longo alcance, corpo em polímero e carregador extra.",
            image: "https://lacatedralairsoft.com/img-l/M40_ROSSI.jpg",
            category: "Snipers"
        },
        {
            id: 6,
            name: "Sniper M24",
            brand: "ROSSI",
            price: 1799,
            description: "Sniper de longo alcance, corpo em polímero e carregador extra.",
            image: "https://lacatedralairsoft.com/img-l/M24_STORM_ROSSI.jpg",
            category: "Snipers"
        },
        {
            id: 7,
            name: "Red Dot 558 + G33",
            brand: "EOTECH",
            price: 950,
            description: "Red Dot 558, retículo vermelho e Magnifier G33 com zoom 3x",
            image: "https://lacatedralairsoft.com/img-l/red_dot_magnifier_tan.jpg",
            category: "Miras"
        },
        {
            id: 8,
            name: "Red Dot T1",
            brand: "VECTOR OPTYCS",
            price: 400,
            description: "Red Dot T1, retículo vermelho com ajuste de luminosidade.",
            image: "https://lacatedralairsoft.com/img-l/red_dot_t1.jpg",
            category: "Miras"
        },
        {
            id: 9,
            name: "Máscara Tática Dye FMA F1",
            brand: "DYE",
            price: 400,
            description: "Máscara de proteção full face com lente anti-embaçante",
            image: "https://lacatedralairsoft.com/img-l/fma1_amarela.jpg",
            category: "Proteção"
        },
        {
            id: 10,
            name: "Óculos Daisy X7",
            brand: "DAISY",
            price: 160,
            description: "Próprio para airsoft, com lente totalmente polarizada.",
            image: "https://lacatedralairsoft.com/img-l/oculos_daisy_c5.jpg",
            category: "Proteção"
        },
        {
            id: 11,
            name: "BB'S 0.25g 5.800Un",
            brand: "LA CATEDRAL",
            price: 165,
            description: "Pacote de bolinhas 0.25g com 5.800 unidades.",
            image: "https://lacatedralairsoft.com/img-l/bb0.25_5800_catedral.png",
            category: "Bolinhas"
        },
        {
            id: 12,
            name: "BB'S 0.28g 5.800Un",
            brand: "LA CATEDRAL",
            price: 195,
            description: "Pacote de bolinhas 0.28g com 5.800 unidades.",
            image: "https://lacatedralairsoft.com/img-l/bb0.28_5800_catedral.png",
            category: "Bolinhas"
        },
        {
            id: 13,
            name: "AnPeq 15 Remote EX276",
            brand: "ELEMENT",
            price: 499,
            description: "Anpeq 15 EX276 funcional com lanterna de led, laser infravermelho e acionador remoto",
            image: "https://lacatedralairsoft.com/img-l/anpeq_preto.jpg",
            category: "Acessórios"
        },
        {
            id: 14,
            name: "Tracer Spitifire",
            brand: "SPITIFIRE",
            price: 195,
            description: "Tracer Airsoft Lighter S ultra compact recarregável. Mod-Spitifire.",
            image: "https://lacatedralairsoft.com/img-l/tracer_spitfire.jpg",
            category: "Acessórios"
        },
        {
            id: 15,
            name: "Gás Red",
            brand: "TAG",
            price: 110,
            description: "O cilindro Green Gás Red Airsoft Taikoon NTK 270g de alta performance foi formulado para entregar potência extra para armas e pistolas de airsoft GBB gás.",
            image: "https://lacatedralairsoft.com/img-l/red_gas.jpg",
            category: "Suprimentos"
        },
        {
            id: 16,
            name: "Gás Taikoon",
            brand: "TAG",
            price: 95,
            description: "Possui uma fórmula especial, para maximizar a performance e proteger os componentes internos de seu equipamento, não necessitando de bico adaptador.",
            image: "https://lacatedralairsoft.com/img-l/gas-tag.jpg",
            category: "Suprimentos"
        },
    ];

 {/* Alguns dos campos da empresa */}
    const campos = [
        {
            id: 1,
            nome: "LA FÁBRICA",
            video: require('./assets/videos/la_fabrica.mp4'),
            descricao: "Explore a essência do combate de curta distância no Campo La Fábrica, nossa sede localizada no bairro Planalto, Belo Horizonte. Este campo oferece uma experiência única em CQB, repleto de obstáculos estratégicos, como ônibus e carros abandonados, barricadas e construções destruídas. Este é o local perfeito para operadores que buscam adrenalina em um ambiente desafiador."
        },
        {
            id: 2,
            nome: "LA CLÍNICA",
            video: require('./assets/videos/la_clinica.mp4'),
            descricao: "Em Vespasiano, mergulhe na atmosfera intrigante do Campo La Clínica. Uma enorme clínica psiquiátrica abandonada aguarda, com quatro prédios de até quatro andares cada. Com corredores amplos, salas escuras e uma porção de mata, este campo proporciona jogos envolventes com objetivos e missões, oferecendo uma experiência de airsoft única."
        },
        {
            id: 3,
            nome: "LA VILLA",
            video: require('./assets/videos/la_villa.mp4'),
            descricao: "Descubra o charme abandonado do Campo La Villa, localizado em Pedro Leopoldo. Nesta vila deserta, explore casas abandonadas, obstáculos e muito mato, proporcionando um ambiente diversificado para suas operações. Este campo é perfeito para aqueles que buscam um cenário mais rústico e cheio de mistério."
        },
    ];

    if (showSplash) {
        return (
            <View style={styles.splashContainer}>
                <Image
                    source={require('./assets/logo.png')}
                    style={styles.logo}
                    contentFit="contain"
                />
            </View>
        );
    }

    const renderProduct = ({ item }) => (
        <TouchableOpacity
            style={styles.productCard}
            onPress={() => openProductDetails(item)}
        >
            <Image
                source={{ uri: item.image }}
                style={styles.productImage}
                contentFit="contain"
            />
            <View style={styles.productInfo}>
                <Text style={styles.productCategory}>{item.category}</Text>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productBrand}>{item.brand}</Text>
                <Text style={styles.productPrice}>R$ {item.price.toFixed(2)}</Text>
                <TouchableOpacity
                    style={styles.buyButton}
                    onPress={(e) => {
                        e.stopPropagation();
                        addToCart(item);
                    }}
                >
                    <Text style={styles.buyButtonText}>COMPRAR</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    const renderCampo = ({ item }) => {
        const handleJogarPress = () => {
            const message = `Olá, La Catedral! Gostaria de mais informações sobre como jogar no campo ${item.nome}.`;
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://api.whatsapp.com/send?phone=5531998331464&text=${encodedMessage}`;
            Linking.openURL(whatsappUrl).catch(() => {
                alert('Não foi possível abrir o WhatsApp');
            });
        };

        return (
            <View style={styles.campoContainer}>
                <Text style={styles.campoNome}>{item.nome}</Text>
                <Video
                    source={item.video}
                    style={styles.video}
                    useNativeControls
                    resizeMode="contain"
                    isLooping
                />
                <Text style={styles.campoDescricao}>{item.descricao}</Text>
                <TouchableOpacity
                    style={styles.jogarButton}
                    onPress={handleJogarPress}
                >
                    <Text style={styles.jogarButtonText}>Quero jogar neste campo</Text>
                </TouchableOpacity>
            </View>
        );
    };

     {/* Tópico para contato no rodapé */}
    const ContactSection = () => (
        <View style={styles.contactContainer}>
            <Text style={styles.contactTitle}>CONTATO</Text>
            <TouchableOpacity onPress={() => Linking.openURL('tel:31998331464')}>
                <Text style={styles.contactItem}>📞 31 99833-1464</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL('mailto:contato@lacatedralairsoft.com')}>
                <Text style={styles.contactItem}>✉️ contato@lacatedralairsoft.com</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL('https://www.lacatedralairsoft.com')}>
                <Text style={styles.contactItem}>🌐 www.lacatedralairsoft.com</Text>
            </TouchableOpacity>
        </View>
    );

    const CategoryFilter = ({ selectedCategory, onSelectCategory }) => {
        const [isOpen, setIsOpen] = useState(false);
        const categories = ["Todos", "Rifles", "Snipers", "Pistolas", "Miras", "Proteção", "Bolinhas", "Acessórios", "Suprimentos"];

        return (
            <View style={styles.filterContainer}>
                <TouchableOpacity
                    style={styles.filterButton}
                    onPress={() => setIsOpen(!isOpen)}
                >
                    <Text style={styles.filterButtonText}>{selectedCategory}</Text>
                    <MaterialIcons
                        name={isOpen ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                        size={24}
                        color="#333"
                    />
                </TouchableOpacity>

                {isOpen && (
                    <View style={styles.dropdown}>
                        {categories.map((category) => (
                            <TouchableOpacity
                                key={category}
                                style={styles.dropdownItem}
                                onPress={() => {
                                    onSelectCategory(category);
                                    setIsOpen(false);
                                }}
                            >
                                <Text style={[
                                    styles.dropdownItemText,
                                    selectedCategory === category && styles.selectedItem
                                ]}>
                                    {category}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </View>
        );
    };

    const LojaScreen = () => {
        const filteredProducts = selectedCategory === "Todos"
            ? products
            : products.filter(product => product.category === selectedCategory);

        return (
            <>
                <View style={styles.headerContainer}>
                    <Text style={styles.title}>LOJA</Text>
                    <CategoryFilter
                        selectedCategory={selectedCategory}
                        onSelectCategory={setSelectedCategory}
                    />
                </View>

                <FlatList
                    data={filteredProducts}
                    renderItem={renderProduct}
                    keyExtractor={item => item.id.toString()}
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                    scrollEnabled={false}
                    contentContainerStyle={styles.productsContainer}
                />
                <ContactSection />
            </>
        );
    };

    const CamposScreen = () => (
        <>
            <Text style={styles.title}>CAMPOS</Text>
            <View style={styles.camposListContainer}>
                <FlatList
                    data={campos}
                    renderItem={renderCampo}
                    keyExtractor={item => item.id.toString()}
                    scrollEnabled={false}
                    contentContainerStyle={styles.camposContainer}
                />
            </View>
            <ContactSection />
        </>
    );

    const ContatoScreen = () => (
        <View style={styles.contactPageContainer}>
            <View style={styles.contactInfoContainer}>
                <View style={styles.contactItemWrapper}>
                    <MaterialIcons name="place" size={24} color="#2a9d8f" />
                    <Text style={styles.contactText}>
                        Rua Francisco Augusto Rocha, 150 - Planalto{"\n"}
                        Belo Horizonte - MG, 31744-002
                    </Text>
                </View>

                <View style={styles.contactItemWrapper}>
                    <MaterialIcons name="access-time" size={24} color="#2a9d8f" />
                    <Text style={styles.contactText}>
                        Segunda a Sexta: 8h às 20h{"\n"}
                        Sábado e Domingo: 8h às 14h
                    </Text>
                </View>

                <View style={styles.contactItemWrapper}>
                    <MaterialIcons name="public" size={24} color="#2a9d8f" />
                    <TouchableOpacity onPress={() => Linking.openURL('https://lacatedralairsoft.com')}>
                        <Text style={[styles.contactText, styles.linkText]}>
                            lacatedralairsoft.com
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.contactItemWrapper}>
                    <MaterialIcons name="email" size={24} color="#2a9d8f" />
                    <TouchableOpacity onPress={() => Linking.openURL('mailto:contato@lacatedralairsoft.com')}>
                        <Text style={[styles.contactText, styles.linkText]}>
                            contato@lacatedralairsoft.com
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.socialMediaContainer}>
                    <TouchableOpacity
                        style={styles.socialIcon}
                        onPress={() => Linking.openURL('https://www.instagram.com/lacatedralairsoft')}
                    >
                        <FontAwesome name="instagram" size={30} color="#E1306C" />
                        <Text style={styles.socialText}>Instagram</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.socialIcon}
                        onPress={() => Linking.openURL('https://api.whatsapp.com/send?phone=5531998331464&text=Olá,%20Lá%20Catedral%20Airsoft.')}
                    >
                        <FontAwesome name="whatsapp" size={30} color="#25D366" />
                        <Text style={styles.socialText}>WhatsApp</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    const renderScreen = () => {
        switch (currentScreen) {
            case 'loja': return <LojaScreen />;
            case 'campos': return <CamposScreen />;
            case 'contato': return <ContatoScreen />;
            default: return <LojaScreen />;
        }
    };

    return (
        <View style={styles.mainWrapper}>
            {/* Overlay do Menu */}
            {isMenuOpen && (
                <TouchableOpacity
                    style={styles.menuOverlay}
                    onPress={() => setIsMenuOpen(false)}
                    activeOpacity={1}
                />
            )}

            {/* Menu Hambúrguer */}
            <View style={[styles.menuContainer, isMenuOpen && styles.menuOpen]}>
                <Text style={styles.menuTitle}>MENU</Text>

                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setIsMenuOpen(false)}
                >
                    <Text style={styles.closeButtonText}>←</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('loja')}>
                    <Text style={styles.menuText}>LOJA</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('campos')}>
                    <Text style={styles.menuText}>CAMPOS</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('contato')}>
                    <Text style={styles.menuText}>CONTATO</Text>
                </TouchableOpacity>
            </View>

            {/* Carrinho */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={isCartVisible}
                onRequestClose={() => setIsCartVisible(false)}
            >
                <View style={styles.cartOverlay}>
                    <View style={styles.cartContainer}>
                        <TouchableOpacity
                            style={styles.closeCartButton}
                            onPress={() => setIsCartVisible(false)}
                        >
                            <MaterialIcons name="close" size={24} color="red" />
                        </TouchableOpacity>

                        <Text style={styles.cartTitle}>Seu Carrinho</Text>

                        {cartItems.length === 0 ? (
                            <Text style={styles.emptyCartText}>Seu carrinho está vazio</Text>
                        ) : (
                            <>
                                <FlatList
                                    data={cartItems}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item, index }) => (
                                        <View style={styles.cartItem}>
                                            <Image
                                                source={{ uri: item.image }}
                                                style={styles.cartItemImage}
                                                contentFit="contain"
                                            />
                                            <View style={styles.cartItemInfo}>
                                                <Text style={styles.cartItemName}>{item.name}</Text>
                                                <Text style={styles.cartItemPrice}>R$ {item.price.toFixed(2)}</Text>
                                            </View>
                                            <TouchableOpacity
                                                style={styles.removeItemButton}
                                                onPress={() => removeFromCart(index)}
                                            >
                                                <MaterialIcons name="delete" size={20} color="red" />
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                />
                                <TouchableOpacity
                                    style={styles.completePurchaseButton}
                                    onPress={completePurchase}
                                >
                                    <Text style={styles.completePurchaseButtonText}>Concluir Compra</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </View>
            </Modal>

            {/* Exibição do produto após ser clicado (fica expandido com todas as informações) */}
            {expandedProduct && (
                <View style={styles.productOverlay}>
                    <View style={styles.expandedProductContainer}>
                        <TouchableOpacity
                            style={styles.closeExpandedButton}
                            onPress={closeProductDetails}
                        >
                            <MaterialIcons name="arrow-back" size={30} color="red" />
                        </TouchableOpacity>

                        <Image
                            source={{ uri: expandedProduct.image }}
                            style={styles.expandedProductImage}
                            contentFit="contain"
                        />

                        <View style={styles.expandedProductInfo}>
                            <Text style={styles.expandedProductCategory}>{expandedProduct.category}</Text>
                            <Text style={styles.expandedProductName}>{expandedProduct.name}</Text>
                            <Text style={styles.expandedProductBrand}>{expandedProduct.brand}</Text>
                            <Text style={styles.expandedProductPrice}>R$ {expandedProduct.price.toFixed(2)}</Text>
                            <Text style={styles.expandedProductDescription}>{expandedProduct.description}</Text>

                            <TouchableOpacity
                                style={styles.expandedBuyButton}
                                onPress={() => {
                                    addToCart(expandedProduct);
                                    closeProductDetails();
                                }}
                            >
                                <Text style={styles.expandedBuyButtonText}>ADICIONAR AO CARRINHO</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )}

            <ScrollView style={styles.mainContainer}>
                {/* Cabeçalho do app */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.menuButton} onPress={() => setIsMenuOpen(true)}>
                        <View style={styles.menuLine} />
                        <View style={styles.menuLine} />
                        <View style={styles.menuLine} />
                    </TouchableOpacity>

                    <Image
                        source={require('./assets/logo_black.png')}
                        style={styles.headerLogo}
                        contentFit="contain"
                    />

                    <TouchableOpacity
                        style={styles.cartButton}
                        onPress={() => setIsCartVisible(true)}
                    >
                        <MaterialIcons name="shopping-cart" size={24} color="#333" />
                        {cartItems.length > 0 && (
                            <View style={styles.cartBadge}>
                                <Text style={styles.cartBadgeText}>{cartItems.length}</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>

                {/* Banner que defini para cada página */}
                <Image
                    source={
                        currentScreen === 'contato'
                            ? require('./assets/banner-contato.png')
                            : currentScreen === 'campos'
                                ? require('./assets/banner-campos.png')
                                : require('./assets/banner.png')
                    }
                    style={styles.banner}
                    contentFit="cover"
                />

                {renderScreen()}

                {/* Rodapé do app */}
                <TouchableOpacity onPress={() => Linking.openURL('https://marquesweb.com')}>
                    <View style={styles.footerContainer}>
                        <Text style={styles.developedBy}>Desenvolvido por Marques Web</Text>
                        <Image
                            source={require('./assets/logo_mw.png')}
                            style={styles.developedByLogo}
                            resizeMode="contain"
                        />
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    splashContainer: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 200,
        height: 100,
        marginBottom: 20,
    },
    splashText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    mainContainer: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 10,
        paddingHorizontal: 16,
    },
    headerLogo: {
        width: 150,
        height: 75,
        left: 0,
        marginTop: 3,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        textTransform: 'uppercase',
        marginLeft: 8,
        marginBottom: 0,
    },
    productsContainer: {
        paddingBottom: 16,
    },
    camposContainer: {
        paddingBottom: 16,
    },
    camposListContainer: {
        marginTop: 15,
    },
    row: {
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    productCard: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 12,
        width: '48%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        justifyContent: 'space-between',
    },
    campoContainer: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    campoNome: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
        textAlign: 'center',
    },
    video: {
        width: '100%',
        height: 300,
        marginBottom: 10,
        borderRadius: 8,
    },
    campoDescricao: {
        fontSize: 14,
        color: '#555',
        lineHeight: 20,
    },
    productImage: {
        width: '100%',
        height: 120,
        marginBottom: 8,
        borderRadius: 4,
    },
    productInfo: {
        paddingHorizontal: 4,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#333',
    },
    productBrand: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2a9d8f',
        marginBottom: 6,
    },
    productDescription: {
        fontSize: 12,
        color: '#555',
        lineHeight: 16,
        marginBottom: 4,
    },
    contactContainer: {
        marginTop: 16,
        padding: 16,
        backgroundColor: '#333',
        borderRadius: 8,
        marginBottom: 20,
    },
    contactTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 12,
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    contactItem: {
        color: 'white',
        fontSize: 14,
        marginBottom: 8,
        paddingVertical: 4,
    },
    developedBy: {
        fontSize: 12,
        textAlign: 'center',
        color: 'gray',
        marginTop: 0,
        marginBottom: 40,
        marginRight: 5,
    },
    footerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    developedByLogo: {
        width: 20,
        height: 20,
        marginTop: -40,
    },
    buyButton: {
        backgroundColor: '#2a9d8f',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
    },
    buyButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },
    banner: {
        width: '100%',
        height: 180,
        marginTop: 5,
        borderRadius: 8,
        marginBottom: 10,
    },
    mainWrapper: {
        flex: 1,
        position: 'relative',
    },
    menuButton: {
        position: 'absolute',
        left: -8,
        top: 28,
        zIndex: 2,
        padding: 10,
    },
    menuButtonSplash: {
        position: 'absolute',
        left: 16,
        top: 50,
        zIndex: 2,
        padding: 10,
    },
    menuButtonPlaceholder: {
        width: 40,
    },
    menuLine: {
        width: 25,
        height: 3,
        backgroundColor: '#333',
        marginVertical: 3,
        borderRadius: 3,
    },
    menuTitle: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
        marginTop: 20,
    },
    menuContainer: {
        position: 'absolute',
        left: -200,
        top: 0,
        bottom: 0,
        width: 200,
        backgroundColor: '#333',
        zIndex: 10,
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    menuOpen: {
        left: 0,
    },
    menuOverlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 5,
    },
    menuItem: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#555',
    },
    menuText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    closeButton: {
        position: 'absolute',
        top: 30,
        right: 10,
        zIndex: 11,
        padding: 10,
    },
    closeButtonText: {
        color: 'red',
        fontSize: 30,
        fontWeight: 'bold',
    },
    menuContainer: {
        position: 'absolute',
        left: -200,
        top: 0,
        bottom: 0,
        width: 200,
        backgroundColor: '#333',
        zIndex: 10,
        paddingTop: 60,
        paddingHorizontal: 20,
    },
    contactPageContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    contactInfoContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    contactItemWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    contactText: {
        marginLeft: 15,
        fontSize: 16,
        color: '#333',
        flex: 1,
    },
    linkText: {
        color: '#2a9d8f',
        textDecorationLine: 'underline',
    },
    socialMediaContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 30,
    },
    socialIcon: {
        alignItems: 'center',
    },
    socialText: {
        marginTop: 5,
        fontSize: 14,
        color: '#333',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 8,
        marginBottom: 15,
    },
    filterContainer: {
        position: 'relative',
        zIndex: 2,
    },
    filterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    filterButtonText: {
        marginRight: 5,
        color: '#333',
    },
    dropdown: {
        position: 'absolute',
        top: 40,
        right: 0,
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        minWidth: 150,
    },
    dropdownItem: {
        paddingVertical: 8,
    },
    dropdownItemText: {
        fontSize: 16,
        color: '#333',
    },
    selectedItem: {
        color: '#2a9d8f',
        fontWeight: 'bold',
    },
    productCategory: {
        fontSize: 12,
        color: '#2a9d8f',
        fontWeight: 'bold',
        marginBottom: 2,
    },
    jogarButton: {
        backgroundColor: '#2a9d8f',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    jogarButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    cartButton: {
        position: 'absolute',
        right: 0,
        top: 28,
        zIndex: 2,
        padding: 10,
    },
    cartBadge: {
        position: 'absolute',
        right: 5,
        top: 5,
        backgroundColor: 'red',
        borderRadius: 10,
        width: 18,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cartBadgeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    cartOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cartContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        width: '90%',
        maxHeight: '80%',
    },
    closeCartButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
    },
    cartTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    emptyCartText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#666',
        marginVertical: 20,
    },
    cartItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    cartItemImage: {
        width: 50,
        height: 50,
        borderRadius: 5,
        marginRight: 10,
    },
    cartItemInfo: {
        flex: 1,
    },
    cartItemName: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    cartItemPrice: {
        fontSize: 14,
        color: '#2a9d8f',
    },
    removeItemButton: {
        padding: 5,
    },
    completePurchaseButton: {
        backgroundColor: '#2a9d8f',
        padding: 15,
        borderRadius: 5,
        marginTop: 20,
        alignItems: 'center',
    },
    completePurchaseButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    productOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.8)',
        zIndex: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    expandedProductContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: windowWidth * 0.9,
        maxHeight: windowHeight * 0.8,
        padding: 20,
    },
    closeExpandedButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 21,
    },
    expandedProductImage: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 15,
    },
    expandedProductInfo: {
        paddingHorizontal: 10,
    },
    expandedProductCategory: {
        fontSize: 14,
        color: '#2a9d8f',
        fontWeight: 'bold',
        marginBottom: 5,
    },
    expandedProductName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    expandedProductBrand: {
        fontSize: 16,
        color: '#666',
        marginBottom: 10,
    },
    expandedProductPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2a9d8f',
        marginBottom: 15,
    },
    expandedProductDescription: {
        fontSize: 14,
        color: '#555',
        lineHeight: 20,
        marginBottom: 20,
    },
    expandedBuyButton: {
        backgroundColor: '#2a9d8f',
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: 'center',
    },
    expandedBuyButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});