/**
 * @generated SignedSource<<046ab83681887917955d38228bc65fb8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type addClubPostsListJsonLdFragment$data = {
  readonly name: string;
  readonly slug: string;
  readonly " $fragmentType": "addClubPostsListJsonLdFragment";
};
export type addClubPostsListJsonLdFragment$key = {
  readonly " $data"?: addClubPostsListJsonLdFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"addClubPostsListJsonLdFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "addClubPostsListJsonLdFragment",
  "selections": [
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
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "1343e0241e5d348c39cdab84df4498b8";

export default node;
