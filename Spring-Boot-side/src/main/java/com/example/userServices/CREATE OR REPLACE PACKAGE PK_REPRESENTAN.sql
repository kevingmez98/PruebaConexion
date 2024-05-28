CREATE OR REPLACE PACKAGE PK_REPRESENTANTE AS

-- Funcion que retorna la cantidad actual de un producto en el inventario
 FUNCTION FU_CANTIDAD_STOCK (
    cod_region IN VARCHAR2,
    cod_producto IN VARCHAR2,
    id_cat_producto IN VARCHAR2
) RETURN NUMBER;
    -- Función: Retorna la lista de clientes que tuvo el representante en un periodo establecido
    FUNCTION FU_LISTA_CLIENTES(
        codigo_representante IN VARCHAR,
        fecha_inicio_periodo IN DATE,
        fecha_fin_periodo IN DATE
    ) RETURN SYS_REFCURSOR;

    -- Función: Retorna la lista de pedidos de un cliente en un periodo de tiempo establecido
    FUNCTION FU_LISTA_PEDIDOS(
        codigo_cliente IN VARCHAR,
        fecha_inicio_periodo IN DATE,
        fecha_fin_periodo IN DATE
    ) RETURN SYS_REFCURSOR;

    -- Función: Calcula el valor total de un pedido sumando sus items y cantidades
    FUNCTION FU_TOTAL_PEDIDO(
        codigo_pedido IN VARCHAR
    ) RETURN NUMBER;

    -- Función: Calcula el total vendido de todos los pedidos que tuvo el representante en un periodo de tiempo establecido
    FUNCTION FU_TOTAL_REP(
        codigo_representante IN VARCHAR,
        fecha_inicio_periodo IN DATE,
        fecha_fin_periodo IN DATE
    ) RETURN NUMBER;

    -- Función: Calcula el valor de comisión ganado por el representante de ventas
    FUNCTION FU_PAGO_COMISION(
        codigo_representante IN VARCHAR,
        periodo_inicio IN DATE,
        periodo_fin IN DATE
    ) RETURN NUMBER;

    -- Función: Retorna el código del nuevo representante
    FUNCTION FU_NUEVO_REP(
        codigo_representante IN VARCHAR
    ) RETURN VARCHAR;

    -- Funcion: retorna el promedio de calificaciones para un representante
    FUNCTION FU_PROMEDIO_CALIFICACIONES(
        codigo_representante IN VARCHAR,
        fecha_inicio_periodo IN DATE,
        fecha_fin_periodo IN DATE
    )
    RETURN NUMBER;

    -- Procedimiento: Cambiar de representante
    PROCEDURE PR_CAMBIAR_REP(
        codigo_cliente IN VARCHAR
    );

    -- Procedimiento: Re-clasificar un representante y pagar comision
    PROCEDURE PR_CLASIFICAR_REPRESENTANTE(
        codigo_representante IN VARCHAR,
        fecha_inicio_periodo IN DATE,
        fecha_fin_periodo IN DATE
    );

    -- Procedimiento: Re-Clasificar a todos los representantes de una region y pagar comisiones
    PROCEDURE PR_CLASIFICAR_REPRESENTANTES(
        codigo_region IN VARCHAR
    );

END PK_REPRESENTANTE;



create or replace PACKAGE BODY PK_REPRESENTANTE AS
--Funcion que retorna la cantidad en stock de un producto
    FUNCTION FU_CANTIDAD_STOCK (
    cod_region IN VARCHAR2,
    cod_producto IN VARCHAR2,
    id_cat_producto IN VARCHAR2
) RETURN NUMBER
IS
    stock NUMBER(9);
BEGIN
    SELECT Q_CANTIDAD_EN_STOCK
    INTO stock
    FROM INVENTARIO
    WHERE K_COD_REGION = cod_region
    AND K_COD_PRODUCTO = cod_producto
    AND I_ID_CAT_PRODUCTO = id_cat_producto;

    RETURN stock;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RETURN 0; -- Si no se encuentra ningún registro, se devuelve 0
    WHEN OTHERS THEN
        -- Manejo de excepciones
        RETURN -1; -- Algo más falló
END FU_CANTIDAD_STOCK;
    -- Funcion: Retorna la lista de clientes que tuvo el representante en un periodo establecido
    FUNCTION FU_LISTA_CLIENTES(
        codigo_representante IN VARCHAR,
        fecha_inicio_periodo IN DATE,
        fecha_fin_periodo IN DATE
    )
    RETURN SYS_REFCURSOR
    IS
        lista_clientes SYS_REFCURSOR;
    BEGIN
        OPEN lista_clientes FOR
            SELECT DISTINCT K_DOC_CLIENTE
            FROM CONTRATO
            WHERE K_COD_REPRESENTANTE = codigo_representante
            AND (
                F_INICIO >= fecha_inicio_periodo
                AND ( F_TERMINO IS NULL OR F_TERMINO <= fecha_fin_periodo)
            );

        RETURN lista_clientes;
    END FU_LISTA_CLIENTES;
    

    -- Funcion: Retorna la lista de pedidos de un cliente en un periodo de tiempo establecido

    FUNCTION FU_LISTA_PEDIDOS(
        codigo_cliente IN VARCHAR,
        fecha_inicio_periodo IN DATE,
        fecha_fin_periodo IN DATE
    )
    RETURN SYS_REFCURSOR
    IS
        lista_pedidos SYS_REFCURSOR;
    BEGIN
        OPEN lista_pedidos FOR
            SELECT DISTINCT K_COD_PEDIDO
            FROM PEDIDO
            WHERE K_DOC_CLIENTE = codigo_cliente
            AND (
                F_PEDIDO >= fecha_inicio_periodo
                AND F_PEDIDO <= fecha_fin_periodo
            );

        RETURN lista_pedidos;
    END FU_LISTA_PEDIDOS;
    

    -- Función: Calcula el valor total de un pedido

    FUNCTION FU_TOTAL_PEDIDO(
        codigo_pedido IN VARCHAR
    )
    RETURN NUMBER
    IS
        valor_total NUMBER := 0;
    BEGIN
        -- Cursor para recorrer los elementos del pedido
        FOR item_cursor IN (
            SELECT Q_CANTIDAD, Q_PRECIO_UNITARIO
            FROM ITEM I
            JOIN INVENTARIO INV ON I.K_COD_REGION = INV.K_COD_REGION AND I.K_COD_PRODUCTO = INV.K_COD_PRODUCTO
            WHERE I.K_COD_PEDIDO = codigo_pedido
        )
        LOOP
            -- Calcular el valor total sumando el producto de la cantidad y el precio unitario del inventario
            valor_total := valor_total + (item_cursor.Q_CANTIDAD * item_cursor.Q_PRECIO_UNITARIO);
        END LOOP;
        -- Se agrega un 19% de IVA
        valor_total := valor_total * 1.19;
        RETURN valor_total;
    END FU_TOTAL_PEDIDO;
    

    -- Funcion: Calcula el total vendido de todos lo pedidos que tuvo el representante en un periodo de tiempo establecido

    FUNCTION FU_TOTAL_REP(
        codigo_representante IN VARCHAR,
        fecha_inicio_periodo IN DATE,
        fecha_fin_periodo IN DATE
    )
    RETURN NUMBER
    IS
        total_rep NUMBER := 0;
        codigo_cliente VARCHAR2(10); -- Declaración de la variable codigo_cliente
        codigo_pedido VARCHAR2(10); -- Declaración de la variable codigo_pedido
        cliente_cursor SYS_REFCURSOR;
        pedido_cursor SYS_REFCURSOR;
        valor_pedido NUMBER;
    BEGIN
        -- Abrir cursor para obtener la lista de clientes del representante en el periodo establecido
        cliente_cursor := FU_LISTA_CLIENTES(codigo_representante, fecha_inicio_periodo, fecha_fin_periodo);
        
        -- Iterar sobre cada cliente obtenido
        LOOP
            FETCH cliente_cursor INTO codigo_cliente;
            EXIT WHEN cliente_cursor%NOTFOUND;
            
            -- Abrir cursor para obtener la lista de pedidos del cliente en el periodo establecido
            pedido_cursor := FU_LISTA_PEDIDOS(codigo_cliente, fecha_inicio_periodo, fecha_fin_periodo);
            
            -- Iterar sobre cada pedido del cliente
            LOOP
                FETCH pedido_cursor INTO codigo_pedido;
                EXIT WHEN pedido_cursor%NOTFOUND;
                
                -- Calcular el valor total del pedido y sumarlo al total del representante
                valor_pedido := FU_TOTAL_PEDIDO(codigo_pedido);
                total_rep := total_rep + valor_pedido;
            END LOOP;
            
            -- Cerrar cursor de pedidos del cliente
            CLOSE pedido_cursor;
        END LOOP;
        
        -- Cerrar cursor de clientes del representante
        CLOSE cliente_cursor;
        
        RETURN total_rep;
    END FU_TOTAL_REP;
    

    -- Funcion: Calcula el valor de comision ganado por el rep de ventas 

    FUNCTION FU_PAGO_COMISION(
        codigo_representante IN VARCHAR,
        periodo_inicio IN DATE,
        periodo_fin IN DATE
    )
    RETURN NUMBER
    IS
        tasa_comision NUMBER;
        total_representante NUMBER;
        valor_comision NUMBER;
    BEGIN
        -- Obtener la tasa de comisión del representante
        SELECT T_COMISION INTO tasa_comision
        FROM CLASIFICACION
        WHERE K_ID_CLASIFICACION = (
            SELECT K_ID_CLASIFICACION
            FROM REPRESENTANTE
            WHERE K_COD_REPRESENTANTE = codigo_representante
        )
        AND F_INICIO <= periodo_inicio
        AND (F_FINALIZACION IS NULL);
        
        -- Calcular el total vendido por el representante
        total_representante := FU_TOTAL_REP(codigo_representante, periodo_inicio, periodo_fin);
        --DBMS_OUTPUT.PUT_LINE('Total vendido ' || total_representante);
        -- Calcular el valor de la comisión
        valor_comision := total_representante * (tasa_comision );
        
        RETURN valor_comision;
    END FU_PAGO_COMISION;
    

    -- Crear función FU_NUEVO_REP, retorna el código del nuevo representante 
    FUNCTION FU_NUEVO_REP(
        codigo_representante IN VARCHAR
    )
    RETURN VARCHAR
    IS
        v_region VARCHAR(25);
        v_tasa_comision NUMBER(5,2);
        v_nuevo_representante VARCHAR(10);
        e_no_representante EXCEPTION;
    BEGIN
        -- Obtener la región y la tasa de comisión del representante actual
        SELECT R.K_COD_REGION, C.T_COMISION
        INTO v_region, v_tasa_comision
        FROM REPRESENTANTE R
        JOIN CLASIFICACION C ON R.K_ID_CLASIFICACION = C.K_ID_CLASIFICACION
        WHERE R.K_COD_REPRESENTANTE = codigo_representante;

        -- Buscar un representante de la misma región con una tasa de comisión igual o superior
        SELECT R.K_COD_REPRESENTANTE
        INTO v_nuevo_representante
        FROM REPRESENTANTE R
        JOIN CLASIFICACION C ON R.K_ID_CLASIFICACION = C.K_ID_CLASIFICACION
        WHERE R.K_COD_REGION = v_region
        AND C.T_COMISION >= v_tasa_comision
        AND R.K_COD_REPRESENTANTE <> codigo_representante
        ORDER BY C.T_COMISION ASC
        FETCH FIRST 1 ROWS ONLY;

        RETURN v_nuevo_representante;

    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            RAISE e_no_representante;
        WHEN e_no_representante THEN
            RAISE_APPLICATION_ERROR(-101, 'No existe ningún representante con una clasificación igual o superior en la misma región.');
    END FU_NUEVO_REP;
    

    -- Funcion: retorna el promedio de calificaciones para un representante
    FUNCTION FU_PROMEDIO_CALIFICACIONES(
        codigo_representante IN VARCHAR,
        fecha_inicio_periodo IN DATE,
        fecha_fin_periodo IN DATE
    )
    RETURN NUMBER
    IS
        promedio_calificaciones NUMBER;
        total_calificaciones NUMBER := 0;
        total_pedidos NUMBER := 0;
        calificacion_actual NUMBER;

        cliente_cursor SYS_REFCURSOR;
        pedido_cursor SYS_REFCURSOR;
        codigo_cliente VARCHAR(10);
        codigo_pedido VARCHAR(10);
    BEGIN
        -- Abrir cursor para obtener la lista de clientes del representante en el período establecido
        cliente_cursor := FU_LISTA_CLIENTES(codigo_representante, fecha_inicio_periodo, fecha_fin_periodo);
        
        -- Iterar sobre cada cliente obtenido
        LOOP
            FETCH cliente_cursor INTO codigo_cliente;
            EXIT WHEN cliente_cursor%NOTFOUND;
            
            -- Abrir cursor para obtener la lista de pedidos del cliente en el período establecido
            pedido_cursor := FU_LISTA_PEDIDOS(codigo_cliente, fecha_inicio_periodo, fecha_fin_periodo);
            
            -- Iterar sobre cada pedido del cliente
            LOOP
                FETCH pedido_cursor INTO codigo_pedido;
                EXIT WHEN pedido_cursor%NOTFOUND;
                
                -- Obtener la calificación del pedido si el estado es 'F'
                BEGIN
                    SELECT Q_CALIFICACION
                    INTO calificacion_actual
                    FROM PEDIDO
                    WHERE K_COD_PEDIDO = codigo_pedido
                    AND I_ESTADO = 'F';
                    
                    -- Sumar la calificación al total y contar el pedido
                    total_calificaciones := total_calificaciones + calificacion_actual;
                    total_pedidos := total_pedidos + 1;
                EXCEPTION
                    WHEN NO_DATA_FOUND THEN
                        NULL; -- No se hace nada si no se encuentra la calificación del pedido
                END;
            END LOOP;
            
            -- Cerrar cursor de pedidos del cliente
            CLOSE pedido_cursor;
        END LOOP;
        
        -- Cerrar cursor de clientes del representante
        CLOSE cliente_cursor;
        
        -- Calcular el promedio de las calificaciones
        IF total_pedidos > 0 THEN
            promedio_calificaciones := total_calificaciones / total_pedidos;
        ELSE
            promedio_calificaciones := 0; -- Si no hay pedidos, el promedio es cero
        END IF;
        
        RETURN promedio_calificaciones;
    END FU_PROMEDIO_CALIFICACIONES;
    


    -- Procedimiento: cambiar de representante 
    PROCEDURE PR_CAMBIAR_REP(
        codigo_cliente IN VARCHAR
    )
    IS
        v_codigo_representante_actual VARCHAR(10);
        v_codigo_nuevo_representante VARCHAR(10);
        e_no_nuevo_representante EXCEPTION;
    BEGIN
        -- Seleccionar el código del representante actual del contrato
        SELECT K_COD_REPRESENTANTE
        INTO v_codigo_representante_actual
        FROM CONTRATO
        WHERE K_DOC_CLIENTE = codigo_cliente
        AND F_TERMINO IS NULL;
        
        -- Obtener un nuevo representante usando la función FU_NUEVO_REP
        BEGIN
            v_codigo_nuevo_representante := FU_NUEVO_REP(v_codigo_representante_actual);
        EXCEPTION
            WHEN OTHERS THEN
                RAISE e_no_nuevo_representante;
        END;

        -- Finalizar el contrato actual con la fecha actual del sistema
        UPDATE CONTRATO
        SET F_TERMINO = SYSDATE
        WHERE K_DOC_CLIENTE = codigo_cliente
        AND F_TERMINO IS NULL;

        -- Crear un nuevo contrato con el nuevo representante y la fecha actual del sistema
        INSERT INTO CONTRATO (K_COD_CONTRATO, K_COD_REPRESENTANTE, K_DOC_CLIENTE, I_TIPO_DOC, F_INICIO, F_TERMINO)
        VALUES (
            CONTRATO_ID_SEQ.NEXTVAL,
            v_codigo_nuevo_representante,
            codigo_cliente,
            (SELECT I_TIPO_DOC FROM CLIENTE WHERE K_DOC_CLIENTE = codigo_cliente),
            SYSDATE,
            NULL
        );

    EXCEPTION
        WHEN e_no_nuevo_representante THEN
            RAISE_APPLICATION_ERROR(-20001, 'No se encontró un nuevo representante con una clasificación igual o superior en la misma región.');
        WHEN NO_DATA_FOUND THEN
            RAISE_APPLICATION_ERROR(-20002, 'No se encontró el representante actual del cliente.');
    END PR_CAMBIAR_REP;
    

    -- Procedure Clasificar un representante 
    PROCEDURE PR_CLASIFICAR_REPRESENTANTE(
        codigo_representante IN VARCHAR,
        fecha_inicio_periodo IN DATE,
        fecha_fin_periodo IN DATE
    )
    IS
        ventas_totales NUMBER;
        comision_ganada NUMBER;
        promedio_calificaciones NUMBER;
        clasificacion_actual VARCHAR(3);
        nueva_clasificacion VARCHAR(3);
    BEGIN
        -- Obtener las ventas totales del representante
        ventas_totales := FU_TOTAL_REP(codigo_representante, fecha_inicio_periodo, fecha_fin_periodo);
        
        -- Obtener la comisión ganada por el representante
        comision_ganada := FU_PAGO_COMISION(codigo_representante, fecha_inicio_periodo, fecha_fin_periodo);
        
        -- Obtener el promedio de calificaciones del representante
        promedio_calificaciones := FU_PROMEDIO_CALIFICACIONES(codigo_representante, fecha_inicio_periodo, fecha_fin_periodo);
        
        -- Obtener la clasificación actual del representante
        SELECT K_ID_CLASIFICACION INTO clasificacion_actual
        FROM REPRESENTANTE
        WHERE K_COD_REPRESENTANTE = codigo_representante;

        -- Inicializar la nueva clasificación como la actual
        nueva_clasificacion := clasificacion_actual;

        -- Determinar si debe subir o bajar de clasificación
        FOR rec IN (SELECT * FROM CLASIFICACION ORDER BY Q_MIN_VENTAS DESC, Q_MIN_CALIFICACION DESC)
        LOOP
            IF ventas_totales >= rec.Q_MIN_VENTAS AND promedio_calificaciones >= rec.Q_MIN_CALIFICACION THEN
                nueva_clasificacion := rec.K_ID_CLASIFICACION;
                EXIT; -- La clasificación más alta que cumple los requisitos
            END IF;
        END LOOP;

        -- Imprimir los datos en consola
        DBMS_OUTPUT.PUT_LINE('Ventas totales: ' || ventas_totales);
        DBMS_OUTPUT.PUT_LINE('Comisión ganada: ' || comision_ganada);
        DBMS_OUTPUT.PUT_LINE('Promedio de calificaciones: ' || promedio_calificaciones);
        DBMS_OUTPUT.PUT_LINE('Clasificación actual: ' || clasificacion_actual);
        DBMS_OUTPUT.PUT_LINE('Nueva clasificación: ' || nueva_clasificacion);

        -- Actualizar la clasificación del representante si ha cambiado
        IF nueva_clasificacion != clasificacion_actual THEN
            UPDATE REPRESENTANTE
            SET K_ID_CLASIFICACION = nueva_clasificacion
            WHERE K_COD_REPRESENTANTE = codigo_representante;
        END IF;

        -- Insertar el pago de la comisión en la tabla PAGO_COMISION
        INSERT INTO PAGO_COMISION (K_COD_PAGO_COMISION, K_COD_REPRESENTANTE, K_COD_COMISION, F_INICIO, F_TERMINO, V_PAGO)
        VALUES (SEQ_PAGO_COMISION.NEXTVAL, codigo_representante, clasificacion_actual, fecha_inicio_periodo, fecha_fin_periodo, comision_ganada);
        
    END PR_CLASIFICAR_REPRESENTANTE;
    

    -- Procedimiento: Reclasificar a todos los representantes de una region
    PROCEDURE PR_CLASIFICAR_REPRESENTANTES(
        codigo_region IN VARCHAR
    )
    IS
        CURSOR cur_representantes IS
            SELECT DISTINCT K_COD_REPRESENTANTE
            FROM REPRESENTANTE
            WHERE K_COD_REGION = codigo_region;

        fecha_inicio_periodo DATE;
        fecha_fin_periodo DATE := SYSDATE;
    BEGIN
        -- Obtener la fecha de inicio del periodo
        SELECT F_INICIO INTO fecha_inicio_periodo
        FROM CLASIFICACION
        WHERE F_FINALIZACION IS NULL
        AND ROWNUM = 1;

        -- Recorrer todos los representantes de la región
        FOR representante IN cur_representantes LOOP
            -- Clasificar cada representante individualmente
            DBMS_OUTPUT.PUT_LINE('');
            DBMS_OUTPUT.PUT_LINE('- Representante: ' || representante.K_COD_REPRESENTANTE);
            PR_CLASIFICAR_REPRESENTANTE(
                representante.K_COD_REPRESENTANTE,
                fecha_inicio_periodo,
                fecha_fin_periodo
            );
        END LOOP;

        -- Imprimir mensaje de finalización
        DBMS_OUTPUT.PUT_LINE('Clasificación de representantes completada para la región ' || codigo_region);
    END PR_CLASIFICAR_REPRESENTANTES;
    

END PK_REPRESENTANTE;
