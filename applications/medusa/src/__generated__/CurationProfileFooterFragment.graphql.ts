/**
 * @generated SignedSource<<9345b4223fb66e79c1270bf1aaf9c436>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CurationProfileFooterFragment$data = {
  readonly curationProfile: {
    readonly audience: {
      readonly " $fragmentSpreads": FragmentRefs<"CurationProfileAudienceButtonFragment">;
    };
  };
  readonly " $fragmentSpreads": FragmentRefs<"CurationProfileClubsButtonFragment">;
  readonly " $fragmentType": "CurationProfileFooterFragment";
};
export type CurationProfileFooterFragment$key = {
  readonly " $data"?: CurationProfileFooterFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"CurationProfileFooterFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CurationProfileFooterFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "CurationProfile",
      "kind": "LinkedField",
      "name": "curationProfile",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "AudienceCurationProfile",
          "kind": "LinkedField",
          "name": "audience",
          "plural": false,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "CurationProfileAudienceButtonFragment"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CurationProfileClubsButtonFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "efd52b4d0df4200027c4c42789de7225";

export default node;
