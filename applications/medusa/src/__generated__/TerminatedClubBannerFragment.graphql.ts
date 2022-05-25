/**
 * @generated SignedSource<<135f15898f607fb3d28a736edd9a8f4b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TerminatedClubBannerFragment$data = {
  readonly termination: {
    readonly account: {
      readonly username: string;
    };
  } | null;
  readonly " $fragmentType": "TerminatedClubBannerFragment";
};
export type TerminatedClubBannerFragment = TerminatedClubBannerFragment$data;
export type TerminatedClubBannerFragment$key = {
  readonly " $data"?: TerminatedClubBannerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"TerminatedClubBannerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TerminatedClubBannerFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ClubTermination",
      "kind": "LinkedField",
      "name": "termination",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Account",
          "kind": "LinkedField",
          "name": "account",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "username",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "a1644bdf93c8fad45603419e601cc273";

export default node;
