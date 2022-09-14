/**
 * @generated SignedSource<<38e22b75b843f8d9ca976be176597aec>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MetaPublicPostFragment$data = {
  readonly club: {
    readonly slug: string;
  };
  readonly reference: string;
  readonly " $fragmentSpreads": FragmentRefs<"ContainerPublicPostFragment" | "PublicPostRichObjectFragment" | "PublicPostStructuredDataFragment">;
  readonly " $fragmentType": "MetaPublicPostFragment";
};
export type MetaPublicPostFragment$key = {
  readonly " $data"?: MetaPublicPostFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MetaPublicPostFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MetaPublicPostFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "reference",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Club",
      "kind": "LinkedField",
      "name": "club",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "slug",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PublicPostRichObjectFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PublicPostStructuredDataFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ContainerPublicPostFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "84dd2d1840d4934a522220b7214d1506";

export default node;
