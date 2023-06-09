PGDMP             
            {            shortly %   12.14 (Ubuntu 12.14-0ubuntu0.20.04.1) #   14.7 (Ubuntu 14.7-0ubuntu0.22.04.1) $    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16700    shortly    DATABASE     \   CREATE DATABASE shortly WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.UTF-8';
    DROP DATABASE shortly;
                postgres    false            �            1259    16729    clicks    TABLE     �   CREATE TABLE public.clicks (
    "clickId" integer NOT NULL,
    "linkId" integer NOT NULL,
    "clickDate" date DEFAULT now(),
    "ipAddress" character varying(50) DEFAULT '0.0.0.0'::character varying,
    referer text DEFAULT 'N/A'::text
);
    DROP TABLE public.clicks;
       public         heap    postgres    false            �            1259    16727    clicks_clickId_seq    SEQUENCE     �   CREATE SEQUENCE public."clicks_clickId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public."clicks_clickId_seq";
       public          postgres    false    207            �           0    0    clicks_clickId_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public."clicks_clickId_seq" OWNED BY public.clicks."clickId";
          public          postgres    false    206            �            1259    16713    links    TABLE     �   CREATE TABLE public.links (
    "linkId" integer NOT NULL,
    "shortCode" character varying(50) NOT NULL,
    url text NOT NULL,
    "userId" integer NOT NULL
);
    DROP TABLE public.links;
       public         heap    postgres    false            �            1259    16711    links_linkId_seq    SEQUENCE     �   CREATE SEQUENCE public."links_linkId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public."links_linkId_seq";
       public          postgres    false    205            �           0    0    links_linkId_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public."links_linkId_seq" OWNED BY public.links."linkId";
          public          postgres    false    204            �            1259    16748    sessions    TABLE     {   CREATE TABLE public.sessions (
    "sessionId" integer NOT NULL,
    token text NOT NULL,
    "userId" integer NOT NULL
);
    DROP TABLE public.sessions;
       public         heap    postgres    false            �            1259    16746    sessions_sessionId_seq    SEQUENCE     �   CREATE SEQUENCE public."sessions_sessionId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public."sessions_sessionId_seq";
       public          postgres    false    209            �           0    0    sessions_sessionId_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public."sessions_sessionId_seq" OWNED BY public.sessions."sessionId";
          public          postgres    false    208            �            1259    16703    users    TABLE     �   CREATE TABLE public.users (
    "userId" integer NOT NULL,
    name character varying(30) NOT NULL,
    email character varying(320) NOT NULL,
    password character varying(100) NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    16701    users_userId_seq    SEQUENCE     �   CREATE SEQUENCE public."users_userId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public."users_userId_seq";
       public          postgres    false    203            �           0    0    users_userId_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public."users_userId_seq" OWNED BY public.users."userId";
          public          postgres    false    202            '           2604    16732    clicks clickId    DEFAULT     t   ALTER TABLE ONLY public.clicks ALTER COLUMN "clickId" SET DEFAULT nextval('public."clicks_clickId_seq"'::regclass);
 ?   ALTER TABLE public.clicks ALTER COLUMN "clickId" DROP DEFAULT;
       public          postgres    false    207    206    207            &           2604    16716    links linkId    DEFAULT     p   ALTER TABLE ONLY public.links ALTER COLUMN "linkId" SET DEFAULT nextval('public."links_linkId_seq"'::regclass);
 =   ALTER TABLE public.links ALTER COLUMN "linkId" DROP DEFAULT;
       public          postgres    false    205    204    205            +           2604    16751    sessions sessionId    DEFAULT     |   ALTER TABLE ONLY public.sessions ALTER COLUMN "sessionId" SET DEFAULT nextval('public."sessions_sessionId_seq"'::regclass);
 C   ALTER TABLE public.sessions ALTER COLUMN "sessionId" DROP DEFAULT;
       public          postgres    false    208    209    209            %           2604    16706    users userId    DEFAULT     p   ALTER TABLE ONLY public.users ALTER COLUMN "userId" SET DEFAULT nextval('public."users_userId_seq"'::regclass);
 =   ALTER TABLE public.users ALTER COLUMN "userId" DROP DEFAULT;
       public          postgres    false    202    203    203            �          0    16729    clicks 
   TABLE DATA           X   COPY public.clicks ("clickId", "linkId", "clickDate", "ipAddress", referer) FROM stdin;
    public          postgres    false    207   �'       �          0    16713    links 
   TABLE DATA           E   COPY public.links ("linkId", "shortCode", url, "userId") FROM stdin;
    public          postgres    false    205   �'       �          0    16748    sessions 
   TABLE DATA           @   COPY public.sessions ("sessionId", token, "userId") FROM stdin;
    public          postgres    false    209   �'       �          0    16703    users 
   TABLE DATA           @   COPY public.users ("userId", name, email, password) FROM stdin;
    public          postgres    false    203   (       �           0    0    clicks_clickId_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public."clicks_clickId_seq"', 1, false);
          public          postgres    false    206            �           0    0    links_linkId_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public."links_linkId_seq"', 1, false);
          public          postgres    false    204            �           0    0    sessions_sessionId_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public."sessions_sessionId_seq"', 1, false);
          public          postgres    false    208            �           0    0    users_userId_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public."users_userId_seq"', 1, false);
          public          postgres    false    202            3           2606    16740    clicks clicks_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.clicks
    ADD CONSTRAINT clicks_pkey PRIMARY KEY ("clickId");
 <   ALTER TABLE ONLY public.clicks DROP CONSTRAINT clicks_pkey;
       public            postgres    false    207            1           2606    16721    links links_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.links
    ADD CONSTRAINT links_pkey PRIMARY KEY ("linkId");
 :   ALTER TABLE ONLY public.links DROP CONSTRAINT links_pkey;
       public            postgres    false    205            5           2606    16756    sessions sessions_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY ("sessionId");
 @   ALTER TABLE ONLY public.sessions DROP CONSTRAINT sessions_pkey;
       public            postgres    false    209            -           2606    16710    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            postgres    false    203            /           2606    16708    users users_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY ("userId");
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    203            7           2606    16741    clicks clicks_linkId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.clicks
    ADD CONSTRAINT "clicks_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES public.links("linkId");
 E   ALTER TABLE ONLY public.clicks DROP CONSTRAINT "clicks_linkId_fkey";
       public          postgres    false    205    207    2865            6           2606    16722    links links_userId_fkey    FK CONSTRAINT        ALTER TABLE ONLY public.links
    ADD CONSTRAINT "links_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users("userId");
 C   ALTER TABLE ONLY public.links DROP CONSTRAINT "links_userId_fkey";
       public          postgres    false    203    205    2863            8           2606    16757    sessions sessions_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users("userId");
 I   ALTER TABLE ONLY public.sessions DROP CONSTRAINT "sessions_userId_fkey";
       public          postgres    false    209    2863    203            �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �     