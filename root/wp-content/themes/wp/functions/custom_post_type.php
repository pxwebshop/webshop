<?php
/* ===============================================================================
  カスタム投稿設定ファイル
=============================================================================== */

/* 1.カスタム投稿の利用
	TRUE => 利用する　FASLE => 利用しない
------------------------------------------------------------------------------- */
define( "CUSTOM_POST_USE", false );


/* 2.カスタム投稿設定
------------------------------------------------------------------------------- */
if ( CUSTOM_POST_USE ) {
	add_action( 'init', 'addPosts' );

	function addPosts() {
		$add_post_type = array(
			//////

			array(
				'post_type' => 'news',
				'label'     => 'お知らせ',
				'args'      => array( 'supports' => array( 'title', 'editor', 'revisions' ) ),
			),

			//////

			//			array(
			//				'post_type'  => 'einou',
			//				'label'      => '営農情報',
			//				'args'       => array(),
			//				'taxonomies' => array(
			//					array( 'taxonomy' => 'einou_tax', 'label' => 'カテゴリー' )
			//				),
			//			),

			//////
		);

		foreach ( $add_post_type as $data ) {
			$args = array(
				'label'           => $data["label"],
				'menu_icon'       => 'dashicons-admin-post',
				'menu_position'   => 5,
				'has_archive'     => true,
				'description'     => $data["label"],
				'public'          => true,
				'show_ui'         => true,
				'show_in_menu'    => true,
				'capability_type' => 'post',
				'hierarchical'    => true,
				'rewrite'         => array( 'slug' => $data["post_type"], 'with_front' => true ),
				'query_var'       => true,
				'supports'        => array( 'title', 'editor' ),
			);

			$args = array_merge( $args, $data['args'] );

			$args['labels'] = array(
				'name'               => $data["label"],
				'singular_name'      => $data["label"],
				'menu_name'          => $data["label"],
				'add_new'            => '新規追加',
				'add_new_item'       => $data["label"] . 'を新規追加',
				'edit'               => '編集',
				'edit_item'          => $data["label"] . 'を編集',
				'new_item'           => '新着' . $data["label"],
				'view'               => $data["label"] . 'を表示',
				'view_item'          => $data["label"] . 'を表示',
				'search_items'       => $data["label"] . 'を検索',
				'all_items'          => $data["label"] . '一覧',
				'not_found'          => $data["label"] . 'はありません',
				'not_found_in_trash' => 'ゴミ箱は空です',
				'parent'             => '親' . $data["label"],
			);

			register_post_type( $data["post_type"], $args );

			if ( ! empty( $data['taxonomies'] ) && is_array( $data['taxonomies'] ) ) {
				foreach ( $data['taxonomies'] as $tax ) {
					if ( is_string( $tax ) ) {
						register_taxonomy_for_object_type( $tax, $data["post_type"] );
						continue;
					}

					$tax_args = array(
						'public'            => true,
						'show_ui'           => true,
						'show_in_menu'      => true,
						'show_admin_column' => true,
						'rewrite'           => true,
						'hierarchical'      => true,
						//'meta_box_cb'       => 'post_categories_meta_box',
						//'meta_box_cb'       => 'post_tags_meta_box',
						//'update_count_callback' => '_update_generic_term_count',
					);

					if ( isset( $tax['args'] ) ) {
						$tax_args = array_merge( $tax_args, $tax['args'] );
					}

					if ( ! empty( $tax['label'] ) ) {
						$tax_args['label'] = $tax['label'];
					} elseif ( empty( $tax_args['label'] ) ) {
						$tax_args['label'] = ( $tax_args['hierarchical'] ) ? 'カテゴリー' : 'タグ';
					}

					$tax_args['labels'] = array(
						'name'          => $tax_args['label'],
						'singular_name' => $tax_args['label'],
						'search_items'  => $tax_args['label'] . 'を検索',
						'popular_items' => 'よく使われている' . $tax_args['label'],
						'all_items'     => 'すべての' . $tax_args['label'],
						'parent_item'   => '親の' . $tax_args['label'],
						'edit_item'     => $tax_args['label'] . 'の編集',
						'update_item'   => '更新',
						'add_new_item'  => '新規' . $tax_args['label'] . 'を追加',
						'new_item_name' => '新しい' . $tax_args['label'],
					);

					register_taxonomy( $tax['taxonomy'], $data["post_type"], $tax_args );
				}
			}
		}
	}
}
