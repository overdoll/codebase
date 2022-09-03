/**
 * @generated SignedSource<<10fcc9a95114dec3a89d4c16298f7d18>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProfileContributingClubsFragment$data = {
  readonly contributingClubs: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly slug: string;
        readonly " $fragmentSpreads": FragmentRefs<"ClubTileOverlayFragment">;
      };
    }>;
  };
  readonly " $fragmentType": "ProfileContributingClubsFragment";
};
export type ProfileContributingClubsFragment$key = {
  readonly " $data"?: ProfileContributingClubsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ProfileContributingClubsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ProfileContributingClubsFragment",
  "selections": [
    {
      "alias": "contributingClubs",
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
                  "name": "id",
                  "storageKey": null
                },
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

(node as any).hash = "68a19176eedebd673249f54974d7323e";

export default node;
