/**
 * @generated SignedSource<<d2e47bed660f1a877ce3de613a4249f5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PublicClubPostsRichObjectFragment$data = {
  readonly bannerMedia: {
    readonly " $fragmentSpreads": FragmentRefs<"MediaRichObjectFragment">;
  } | null;
  readonly name: string;
  readonly slug: string;
  readonly " $fragmentType": "PublicClubPostsRichObjectFragment";
};
export type PublicClubPostsRichObjectFragment$key = {
  readonly " $data"?: PublicClubPostsRichObjectFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PublicClubPostsRichObjectFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PublicClubPostsRichObjectFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "bannerMedia",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "MediaRichObjectFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "cb33e58135ddaaeab79d730ba9ce9eb1";

export default node;
