/**
 * @generated SignedSource<<90f867c3a1b84e5ef1379c6f42a4bb6b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProfileSupportedClubsFragment$data = {
  readonly supportedClubs: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly slug: string;
        readonly " $fragmentSpreads": FragmentRefs<"ClubTileOverlayFragment">;
      };
    }>;
  };
  readonly " $fragmentType": "ProfileSupportedClubsFragment";
};
export type ProfileSupportedClubsFragment$key = {
  readonly " $data"?: ProfileSupportedClubsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ProfileSupportedClubsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ProfileSupportedClubsFragment",
  "selections": [
    {
      "alias": "supportedClubs",
      "args": null,
      "concreteType": "ClubConnection",
      "kind": "LinkedField",
      "name": "clubs",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ClubEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Club",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "slug",
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "ClubTileOverlayFragment"
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "5d8ec7f093fa8c10d079c445a103e56f";

export default node;
