/**
 * @generated SignedSource<<48e6f50f96cd4d92c402d28649af73b5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PublicClubStructuredDataFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"addClubDataJsonLdFragment" | "addClubPostsJsonLdFragment">;
  readonly " $fragmentType": "PublicClubStructuredDataFragment";
};
export type PublicClubStructuredDataFragment$key = {
  readonly " $data"?: PublicClubStructuredDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PublicClubStructuredDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PublicClubStructuredDataFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "addClubPostsJsonLdFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "addClubDataJsonLdFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "a3026347e91f503b934d20a39589a049";

export default node;
