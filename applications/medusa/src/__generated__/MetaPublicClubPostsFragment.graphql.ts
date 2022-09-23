/**
 * @generated SignedSource<<e42cb18b603c2bce2735c826b7425be6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MetaPublicClubPostsFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ContainerPublicClubPostsFragment" | "PublicClubPostsRichObjectFragment" | "PublicClubPostsStructuredDataFragment">;
  readonly " $fragmentType": "MetaPublicClubPostsFragment";
};
export type MetaPublicClubPostsFragment$key = {
  readonly " $data"?: MetaPublicClubPostsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MetaPublicClubPostsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MetaPublicClubPostsFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PublicClubPostsRichObjectFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PublicClubPostsStructuredDataFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ContainerPublicClubPostsFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "442f07db9b791299ab7b833f226bbb21";

export default node;
