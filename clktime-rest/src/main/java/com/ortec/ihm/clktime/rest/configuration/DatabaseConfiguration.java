package com.ortec.ihm.clktime.rest.configuration;

import com.google.common.collect.Maps;
import com.ortec.ihm.clktime.rest.common.database.DTOConverter;
import org.modelmapper.AbstractConverter;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.dao.annotation.PersistenceExceptionTranslationPostProcessor;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.Database;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;
import java.util.Date;
import java.util.Map;
import java.util.Properties;

/**
 * @Author: romain.pillot
 * @Date: 28/07/2017
 */

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(basePackages = "com.ortec.ihm.clktime.rest.database.repository")
public class DatabaseConfiguration {

    /**
     * @return the wrapped spring data jpa configuration.
     *         Change the scanning packages in case of refactoring, renaming..
     */
    @Bean
    public LocalContainerEntityManagerFactoryBean entityManagerFactory(DataSource dataSource,
                                                                       @Value("${database.dialect}") String dialect)
    {
        HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
        vendorAdapter.setDatabase(Database.SQL_SERVER);
        vendorAdapter.setGenerateDdl(false);

        LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
        em.setDataSource(dataSource);
        em.setPackagesToScan("com.ortec.ihm.clktime.rest.database.model.entity");
        em.setJpaVendorAdapter(vendorAdapter);


        Properties properties = new Properties();
        properties.setProperty("hibernate.dialect", dialect);
        em.setJpaProperties(properties);
        return em;
    }

    /**
     * @return the main datasource
     */
    @Bean
    public DataSource dataSource(@Value("${database.driver_class}") String driver,
                                 @Value("${database.remote}") String remote,
                                 @Value("${database.username}") String username,
                                 @Value("${database.password}") String password)
    {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName(driver);
        dataSource.setUrl(remote);
        dataSource.setUsername(username);
        dataSource.setPassword(password);
        return dataSource;
    }

    /**
     * Set up the EntityManagerFactory, previously configured (see
     */
    @Bean
    public PlatformTransactionManager transactionManager(EntityManagerFactory emf){
        JpaTransactionManager transactionManager = new JpaTransactionManager();
        transactionManager.setEntityManagerFactory(emf);

        return transactionManager;
    }

    @Bean
    public PersistenceExceptionTranslationPostProcessor exceptionTranslation(){
        return new PersistenceExceptionTranslationPostProcessor();
    }

    /**
     * @return a model mapper for conversion between entity <-> dto
     */
    @Bean
    public ModelMapper modelMapper() {
        ModelMapper mapper = new ModelMapper();

        Converter<Date, Long> dateTimeConverter = new AbstractConverter<Date, Long>() {
            protected Long convert(Date source) {
                return source == null ? 0 : source.getTime();
            }
        };

        mapper.addConverter(dateTimeConverter);
        return mapper;
    }

    @Bean
    public Map<Class<?>, DTOConverter> dtoConverters() {
        return Maps.newConcurrentMap();
    }
}
