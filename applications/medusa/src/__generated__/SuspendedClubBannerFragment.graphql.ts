/**
 * @generated SignedSource<<a4d0ccdf81897bc4045a93e8fabc533c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SuspendedClubBannerFragment$data = {
  readonly suspension: {
    readonly __typename: string;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"SuspendedClubModalFragment">;
  readonly " $fragmentType": "SuspendedClubBannerFragment";
};
export type SuspendedClubBannerFragment = SuspendedClubBannerFragment$data;
export type SuspendedClubBannerFragment$key = {
  readonly " $data"?: SuspendedClubBannerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SuspendedClubBannerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SuspendedClubBannerFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ClubSuspension",
      "kind": "LinkedField",
      "name": "suspension",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "__typename",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SuspendedClubModalFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "a4cfcd613068badadd049b612dbcd691";

export default node;
