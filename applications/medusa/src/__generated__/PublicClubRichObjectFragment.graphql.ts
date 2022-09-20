/**
 * @generated SignedSource<<fd2134727640cb7deea25eb700531293>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PublicClubRichObjectFragment$data = {
  readonly bannerMedia: {
    readonly " $fragmentSpreads": FragmentRefs<"MediaRichObjectFragment">;
  } | null;
  readonly name: string;
  readonly slug: string;
  readonly " $fragmentType": "PublicClubRichObjectFragment";
};
export type PublicClubRichObjectFragment$key = {
  readonly " $data"?: PublicClubRichObjectFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PublicClubRichObjectFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PublicClubRichObjectFragment",
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

(node as any).hash = "e5cabff7cc5045ad0cb7ed2a16c271e9";

export default node;
