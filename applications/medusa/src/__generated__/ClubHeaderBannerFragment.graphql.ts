/**
 * @generated SignedSource<<018a1602d75558eb25183bf8243112d2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubHeaderBannerFragment$data = {
  readonly banner: {
    readonly " $fragmentSpreads": FragmentRefs<"ResourceItemFragment">;
  } | null;
  readonly id: string;
  readonly " $fragmentSpreads": FragmentRefs<"LargeClubHeaderFragment">;
  readonly " $fragmentType": "ClubHeaderBannerFragment";
};
export type ClubHeaderBannerFragment$key = {
  readonly " $data"?: ClubHeaderBannerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubHeaderBannerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubHeaderBannerFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Resource",
      "kind": "LinkedField",
      "name": "banner",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ResourceItemFragment"
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "LargeClubHeaderFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "3afc07fb92eb47fec692ab9d226336d7";

export default node;
